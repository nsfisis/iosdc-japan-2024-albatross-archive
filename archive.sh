#!/usr/bin/env bash
#
# Fetches the API responses and user icons of the original site, which can be
# accessed without login, and saves them as static files.

set -euo pipefail

BASE_URL="https://t.nil.ninja/iosdc-japan/2024/code-battle"

cd "$(dirname "$0")"

fetch() {
  curl -fsS --create-dirs -o "$2" "$BASE_URL/$1"
}

# Games held at the event. Unused spare games ("[予備N] ..."), games for
# testing (28, 38), and games that were never started (19, 29, 37) are
# excluded.
GAME_IDS=(
  1         # 8/12 練習用
  4 7 10    # 8/12 予選 1st-3rd Round
  13 16     # 8/12 Extra Stage 1-2
  22 25     # 8/12 Exhibition Match 1-2
  30 31 32 33 # 準々決勝
  34 35     # 準決勝
  36        # 決勝
  39        # 決勝と同じ問題を解こう！
)

for id in "${GAME_IDS[@]}"; do
  fetch "api/games/$id"               "data/games/$id.json"
  fetch "api/games/$id/watch/ranking" "data/games/$id/watch/ranking.json"
done

# Icons of the players shown on the 1v1 watch pages.
for path in $(jq -r '.game.players[].icon_path // empty' data/games/*.json | sort -u); do
  fetch "${path#/}" "public${path}"
done

# One player registered with an email address as the username. Hide it.
for file in $(grep -rlE '"user_id":15,' data); do
  jq -c 'walk(if type == "object" and .user_id == 15 and has("username") then .username = "anonymous" | .display_name = "(非公開)" else . end)' "$file" > "$file.tmp"
  mv "$file.tmp" "$file"
done
