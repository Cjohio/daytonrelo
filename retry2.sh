#!/bin/bash
cd "$(dirname "$0")"
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122 Safari/537.36'
OUT=public/logos/restaurants

tryurl() {
  local id="$1" url="$2"
  curl -fsSL -k -A "$UA" --max-time 15 -o "$OUT/$id.png" "$url" 2>/dev/null || return 1
  size=$(stat -f%z "$OUT/$id.png" 2>/dev/null || echo 0)
  if [ "$size" -gt 300 ]; then
    printf "%-20s OK  (%s bytes)  %s\n" "$id" "$size" "$url"
    return 0
  fi
  rm -f "$OUT/$id.png"
  return 1
}

# marions-piazza
tryurl marions-piazza https://marionspiazza.com/wp-content/uploads/2020/05/mpLogoSmall.png || \
tryurl marions-piazza https://marionspiazza.com/wp-content/themes/marionspiazza/img/logo.png || \
tryurl marions-piazza https://marionspiazza.com/apple-touch-icon.png || \
tryurl marions-piazza https://marionspiazza.com/favicon.ico || \
echo "marions-piazza FAILED"

# root-beer-stand
tryurl root-beer-stand https://rootbeerstande.com/apple-touch-icon.png || \
tryurl root-beer-stand https://rootbeerstande.com/favicon.ico || \
tryurl root-beer-stand http://rootbeerstande.com/favicon.ico || \
tryurl root-beer-stand http://www.rootbeerstande.com/favicon.ico || \
echo "root-beer-stand FAILED"

# oakwood-club — cert issue, use -k
tryurl oakwood-club http://theoakwoodclub.com/apple-touch-icon.png || \
tryurl oakwood-club http://theoakwoodclub.com/favicon.ico || \
tryurl oakwood-club https://theoakwoodclub.com/favicon.ico || \
echo "oakwood-club FAILED"

# sonora-grill
tryurl sonora-grill https://sonoragrillohio.com/apple-touch-icon.png || \
tryurl sonora-grill https://sonoragrillohio.com/favicon.ico || \
tryurl sonora-grill https://dayton.sonoragrillohio.com/favicon.ico || \
echo "sonora-grill FAILED"

echo "---"
ls -la "$OUT" | awk 'NR>1 {printf "%-25s %8s bytes\n", $NF, $5}' | sort
