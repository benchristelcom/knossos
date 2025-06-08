#!/bin/bash

rm -rf src
mkdir -p src

cat >src/index.md <<-EOF
# The Website of Elias Tusques

Hey! I'm Elias, Principal Engineer at Nowhere.ci. We make smart
watches for dogs.

This is my personal blog.

EOF

for i in $(seq -w 1 256); do
    echo -e "# The Product is the Process #$i\n\n" > "src/${i}.md"
    ../markdownov/dev/scripts/cli.ts ../training-data/* >> "src/${i}.md"
done

mdsite