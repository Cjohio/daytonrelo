#!/bin/bash
cd "$(dirname "$0")"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'
OUT=public/logos/restaurants

try_domain() {
  local id="$1" dom="$2"
  for path in /apple-touch-icon.png /apple-touch-icon-precomposed.png /favicon.png /favicon.ico; do
    url="https://$dom$path"
    if curl -fsSL -A "$UA" --max-time 15 -o "$OUT/$id.png" "$url" 2>/dev/null; then
      size=$(stat -f%z "$OUT/$id.png" 2>/dev/null || echo 0)
      if [ "$size" -gt 300 ]; then
        printf "%-18s OK  %-35s  %s bytes\n" "$id" "$path" "$size"
        return 0
      fi
      rm -f "$OUT/$id.png"
    fi
  done
  echo "$id  FAILED all paths for $dom"
  return 1
}

try_domain marions-piazza  marionspiazza.com
try_domain root-beer-stand rootbeerstande.com
try_domain oakwood-club    theoakwoodclub.com
try_domain lilys           lilysdayton.com
try_domain sonora-grill    sonoragrillohio.com

# Also retry the ones that came back suspiciously small (likely generic)
echo "---"
ls -la "$OUT" | awk '$5 < 1000 && NR>1 {print}'
