#!/bin/bash
# Download Dayton restaurant logos into public/logos/restaurants/
# Saves everything as .png (browsers render any format regardless of extension)

set -u
cd "$(dirname "$0")"
OUT="public/logos/restaurants"
mkdir -p "$OUT"

UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'

declare -a JOBS=(
  # Direct logos pulled from each site's HTML
  "pine-club|https://cdn11.bigcommerce.com/s-jlle0x7wfl/images/stencil/original/logo-75_1654699839__93613.original.png"
  "slyders|https://www.slyderstavern.com/wp-content/uploads/2020/03/white@2x.png"
  "jays-seafood|https://images.squarespace-cdn.com/content/v1/5f0d088050ff81013fe27261/1595566874118-654RK2K0UK0K5ZV8PS9N/logo+800x800+circle.png"
  "amber-rose|https://static.spotapps.co/website_images/ab_websites/247989_website_v1/logo_new_2.png"
  "flying-pizza|https://static.spotapps.co/website_images/ab_websites/247819_website_v1/logo.png"
  "wheat-penny|https://images.getbento.com/accounts/92a3fd186226c71284530e66bbca74f1/media/images/42118logo.png"
  "luckys|https://www.luckystaproom.com/uploads/3/4/1/8/34189609/published/luckys-color-final-copy.jpg"
  "manna|https://images.squarespace-cdn.com/content/v1/62c5cf5199c9c769d3d3d955/4aff364e-7413-4ea8-84a2-be4946fcc4ca/Website+Logo+with+title.png"
  "grist|https://cdn.prod.website-files.com/64ff44d8ceb6be56bcf52b9e/64ff4d387fc10ff93bd88394_grist-logo-black.webp"
  # Google favicon fallback for sites that blocked scraping or had no clean logo URL
  "marions-piazza|https://www.google.com/s2/favicons?domain=marionspiazza.com&sz=256"
  "root-beer-stand|https://www.google.com/s2/favicons?domain=rootbeerstande.com&sz=256"
  "oakwood-club|https://www.google.com/s2/favicons?domain=theoakwoodclub.com&sz=256"
  "salar|https://www.google.com/s2/favicons?domain=salarrestaurant.com&sz=256"
  "thai-9|https://www.google.com/s2/favicons?domain=thai9restaurant.com&sz=256"
  "lilys|https://www.google.com/s2/favicons?domain=lilysdayton.com&sz=256"
  "sonora-grill|https://www.google.com/s2/favicons?domain=sonoragrillohio.com&sz=256"
  "meefs|https://www.google.com/s2/favicons?domain=meefspasteria.com&sz=256"
  "flemings|https://www.google.com/s2/favicons?domain=flemingssteakhouse.com&sz=256"
)

ok=0
fail=0
for job in "${JOBS[@]}"; do
  id="${job%%|*}"
  url="${job#*|}"
  dest="$OUT/$id.png"
  printf "%-18s  " "$id"
  if curl -fsSL -A "$UA" --max-time 20 -o "$dest" "$url"; then
    size=$(stat -f%z "$dest" 2>/dev/null || echo 0)
    if [ "$size" -gt 300 ]; then
      printf "OK  (%s bytes)\n" "$size"
      ok=$((ok+1))
    else
      printf "TOO SMALL (%s bytes) — removing\n" "$size"
      rm -f "$dest"
      fail=$((fail+1))
    fi
  else
    printf "FAIL\n"
    fail=$((fail+1))
  fi
done

echo
echo "Done: $ok saved, $fail failed"
ls -la "$OUT"
