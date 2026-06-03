# network-scanner-tool
A Python-based network discovery and port scanning tool built on Nmap. Identifies open ports, running services, versions, and OS fingerprints, outputs results to terminal and JSON.
# network-scanner-tool

> A Python-based network discovery and port scanning tool built on Nmap. Identifies open ports, running services, versions, and OS fingerprints — outputs results to terminal and JSON.

**Author:** Emmanuel Faleti · [Portfolio](https://emmanuelfaleti.vercel.app) · [GitHub](https://github.com/Emmy1223)

---

## Features

- Three scan modes: basic, service, aggressive
- Detects open ports, service names, versions, and CPE identifiers
- OS fingerprinting (aggressive mode)
- Clean color-coded terminal output
- Exports full report to JSON
- Supports single IPs, hostnames, and CIDR ranges

---

## Prerequisites

```bash
# Install Nmap
sudo apt install nmap        # Debian/Ubuntu
brew install nmap            # macOS

# Install Python dependency
pip install python-nmap
```

---

## Usage

```bash
# Basic scan (ports 1-1024)
sudo python3 network_scanner.py -t 192.168.1.1

# Service version detection on custom ports
sudo python3 network_scanner.py -t 192.168.1.0/24 -p 22,80,443,3306

# Aggressive scan with OS detection + save report
sudo python3 network_scanner.py -t scanme.nmap.org -s aggressive -o report.json

# Full port scan
sudo python3 network_scanner.py -t 10.0.0.1 -p 1-65535 -s service
```

---

## Scan Types

| Mode | Description |
|---|---|
| `basic` | Open/closed port detection only |
| `service` | Ports + service name + version (default) |
| `aggressive` | Ports + versions + OS fingerprinting |

---

## Sample Output

```
============================================================
  SCAN REPORT — 2026-06-03 14:22:10
============================================================

  Host      : 45.33.32.156
  Hostname  : scanme.nmap.org
  Status    : UP

  PORT     PROTO    STATE      SERVICE         VERSION
  -----------------------------------------------------------------
  22       tcp      open       ssh             OpenSSH 6.6.1p1
  80       tcp      open       http            Apache 2.4.7
  443      tcp      open       https           N/A

  Summary: 3 open port(s) found.
============================================================
```

---

## ⚠️ Disclaimer

This tool is for **educational and authorized testing only**. Only scan networks and systems you own or have explicit permission to test. Unauthorized scanning is illegal.

---

## Skills demonstrated

`Python` `Nmap` `Networking` `TCP/IP` `Port Scanning` `Security Fundamentals` `JSON` `CLI Tools`

---

## License

MIT
