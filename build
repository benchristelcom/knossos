#!/bin/bash

rm -rf src
mkdir -p src

cat >src/index.md <<-EOF
# The Website of Elias Tusques

Hey! I'm Elias, Principal Engineer at Nowhere.ci. We make smart
watches for dogs.

This is my personal blog.
EOF

cat >src/404.md <<-EOF
<script>
function zeropad(length, num) {
    const s = String(num)
    if (s.length < length) {
        return zeropad(length, "0" + s)
    } else {
        return s
    }
}

window.location = "/" + zeropad(3, Math.floor(Math.random() * 256)) + ".html"
</script>

# You are being redirected...
EOF

./build.js ../training-data/*

mdsite

find docs -type f | xargs sed -Ei 's|href="https?://[^/]+|href="https://benchristel.com/knossos|'

echo -n "knossos.benchristel.com" > docs/CNAME
