#!/usr/bin/env python3
# ============================================================
#  network_scanner.py
#  Author : Emmanuel Faleti
#  GitHub : https://github.com/Emmy1223
#  Desc   : Network discovery and port scanning tool built
#           on top of Nmap. Scans a target IP or range,
#           identifies open ports, services, and OS info,
#           then outputs a clean report (terminal + JSON).
#  Usage  : python3 network_scanner.py -t <target> [options]
#  Prereq : pip install python-nmap && apt install nmap
# ============================================================

import nmap
import argparse
import json
import datetime
import sys
import os

# ─── COLORS ──────────────────────────────────────────────────
class Color:
    CYAN    = '\033[0;36m'
    GREEN   = '\033[0;32m'
    RED     = '\033[0;31m'
    YELLOW  = '\033[0;33m'
    BOLD    = '\033[1m'
    RESET   = '\033[0m'

def banner():
    print(f"""
{Color.CYAN}{Color.BOLD}
  ███╗   ██╗███████╗████████╗    ███████╗ ██████╗ █████╗ ███╗   ██╗
  ████╗  ██║██╔════╝╚══██╔══╝    ██╔════╝██╔════╝██╔══██╗████╗  ██║
  ██╔██╗ ██║█████╗     ██║       ███████╗██║     ███████║██╔██╗ ██║
  ██║╚██╗██║██╔══╝     ██║       ╚════██║██║     ██╔══██║██║╚██╗██║
  ██║ ╚████║███████╗   ██║       ███████║╚██████╗██║  ██║██║ ╚████║
  ╚═╝  ╚═══╝╚══════╝   ╚═╝       ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝
{Color.RESET}
  {Color.YELLOW}Network Scanner Tool — by Emmanuel Faleti{Color.RESET}
  {Color.CYAN}github.com/Emmy1223{Color.RESET}
    """)

# ─── ARGUMENT PARSER ─────────────────────────────────────────
def parse_args():
    parser = argparse.ArgumentParser(
        description="Network Scanner Tool — Emmanuel Faleti",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument(
        "-t", "--target",
        required=True,
        help="Target IP, hostname, or CIDR range\nExamples:\n  192.168.1.1\n  192.168.1.0/24\n  scanme.nmap.org"
    )
    parser.add_argument(
        "-p", "--ports",
        default="1-1024",
        help="Port range to scan (default: 1-1024)\nExamples: 22,80,443 or 1-65535"
    )
    parser.add_argument(
        "-s", "--scan-type",
        choices=["basic", "service", "aggressive"],
        default="service",
        help="Scan type:\n  basic      — open/closed ports only\n  service    — ports + service versions (default)\n  aggressive — ports + versions + OS detection"
    )
    parser.add_argument(
        "-o", "--output",
        help="Save report to JSON file (e.g. report.json)"
    )
    parser.add_argument(
        "--timeout",
        type=int,
        default=60,
        help="Scan timeout in seconds (default: 60)"
    )
    return parser.parse_args()

# ─── SCAN PROFILES ───────────────────────────────────────────
SCAN_PROFILES = {
    "basic":      "-sS",
    "service":    "-sS -sV",
    "aggressive": "-sS -sV -O --osscan-guess",
}

# ─── SCANNER ─────────────────────────────────────────────────
def run_scan(target: str, ports: str, scan_type: str) -> dict:
    nm = nmap.PortScanner()
    args = SCAN_PROFILES[scan_type]

    print(f"\n{Color.CYAN}[*] Target     :{Color.RESET} {target}")
    print(f"{Color.CYAN}[*] Ports      :{Color.RESET} {ports}")
    print(f"{Color.CYAN}[*] Scan type  :{Color.RESET} {scan_type}")
    print(f"{Color.CYAN}[*] Started    :{Color.RESET} {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{Color.YELLOW}[*] Scanning... this may take a moment.{Color.RESET}\n")

    try:
        nm.scan(hosts=target, ports=ports, arguments=args)
    except nmap.PortScannerError as e:
        print(f"{Color.RED}[ERROR] Nmap error: {e}{Color.RESET}")
        sys.exit(1)
    except Exception as e:
        print(f"{Color.RED}[ERROR] Unexpected error: {e}{Color.RESET}")
        sys.exit(1)

    return nm

# ─── PARSE RESULTS ───────────────────────────────────────────
def parse_results(nm: nmap.PortScanner) -> list:
    results = []

    for host in nm.all_hosts():
        host_data = {
            "ip": host,
            "hostname": nm[host].hostname() or "N/A",
            "state": nm[host].state(),
            "os": "N/A",
            "open_ports": []
        }

        # OS detection if available
        if "osmatch" in nm[host] and nm[host]["osmatch"]:
            host_data["os"] = nm[host]["osmatch"][0].get("name", "N/A")

        # Iterate protocols
        for proto in nm[host].all_protocols():
            ports = sorted(nm[host][proto].keys())
            for port in ports:
                port_info = nm[host][proto][port]
                if port_info["state"] == "open":
                    host_data["open_ports"].append({
                        "port":     port,
                        "protocol": proto,
                        "state":    port_info["state"],
                        "service":  port_info.get("name", "unknown"),
                        "version":  f"{port_info.get('product','')} {port_info.get('version','')}".strip() or "N/A",
                        "cpe":      port_info.get("cpe", "N/A")
                    })

        results.append(host_data)

    return results

# ─── PRINT REPORT ────────────────────────────────────────────
def print_report(results: list, scan_type: str):
    print(f"\n{Color.BOLD}{'='*60}{Color.RESET}")
    print(f"{Color.BOLD}  SCAN REPORT — {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}{Color.RESET}")
    print(f"{Color.BOLD}{'='*60}{Color.RESET}\n")

    if not results:
        print(f"{Color.RED}  No hosts found or all hosts are down.{Color.RESET}")
        return

    for host in results:
        status_color = Color.GREEN if host["state"] == "up" else Color.RED
        print(f"  {Color.BOLD}Host      :{Color.RESET} {Color.CYAN}{host['ip']}{Color.RESET}")
        print(f"  {Color.BOLD}Hostname  :{Color.RESET} {host['hostname']}")
        print(f"  {Color.BOLD}Status    :{Color.RESET} {status_color}{host['state'].upper()}{Color.RESET}")

        if scan_type == "aggressive":
            print(f"  {Color.BOLD}OS        :{Color.RESET} {host['os']}")

        print(f"\n  {Color.BOLD}{'PORT':<8} {'PROTO':<8} {'STATE':<10} {'SERVICE':<15} {'VERSION'}{Color.RESET}")
        print(f"  {'-'*65}")

        if host["open_ports"]:
            for p in host["open_ports"]:
                print(
                    f"  {Color.GREEN}{p['port']:<8}{Color.RESET}"
                    f"{p['protocol']:<8}"
                    f"{Color.GREEN}{p['state']:<10}{Color.RESET}"
                    f"{p['service']:<15}"
                    f"{Color.YELLOW}{p['version']}{Color.RESET}"
                )
        else:
            print(f"  {Color.YELLOW}  No open ports found in scanned range.{Color.RESET}")

        print(f"\n  {Color.BOLD}Summary:{Color.RESET} {len(host['open_ports'])} open port(s) found.")
        print(f"\n{Color.BOLD}{'='*60}{Color.RESET}\n")

# ─── SAVE REPORT ─────────────────────────────────────────────
def save_report(results: list, path: str, target: str, scan_type: str):
    report = {
        "tool":      "network-scanner-tool",
        "author":    "Emmanuel Faleti",
        "github":    "https://github.com/Emmy1223",
        "timestamp": datetime.datetime.now().isoformat(),
        "target":    target,
        "scan_type": scan_type,
        "hosts":     results
    }
    with open(path, "w") as f:
        json.dump(report, f, indent=2)
    print(f"{Color.GREEN}[+] Report saved → {path}{Color.RESET}\n")

# ─── MAIN ────────────────────────────────────────────────────
def main():
    # Root check for SYN scan
    if os.geteuid() != 0:
        print(f"{Color.YELLOW}[!] Warning: SYN scan (-sS) requires root. Run with sudo for best results.{Color.RESET}")

    banner()
    args = parse_args()

    nm = run_scan(args.target, args.ports, args.scan_type)
    results = parse_results(nm)
    print_report(results, args.scan_type)

    if args.output:
        save_report(results, args.output, args.target, args.scan_type)

if __name__ == "__main__":
    main()
