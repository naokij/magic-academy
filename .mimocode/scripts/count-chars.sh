#!/bin/bash
# 统计故事文件的中文字数和总字数
# 用法: bash .mimocode/scripts/count-chars.sh <file.md> [file2.md ...]
# 示例: bash .mimocode/scripts/count-chars.sh stories/*.md

if [ $# -eq 0 ]; then
    echo "用法: $0 <file.md> [file2.md ...]"
    echo "示例: $0 stories/1-冰火仙子.md stories/2-植物梦幻仙子.md"
    exit 1
fi

total_chinese=0
total_chars=0

for file in "$@"; do
    if [ ! -f "$file" ]; then
        echo "⚠️  文件不存在: $file"
        continue
    fi

    read chinese chars <<< $(python3 -c "
import re, sys
with open('$file', 'r') as f:
    text = f.read()
# 去掉 frontmatter
body = re.sub(r'^---.*?---\s*', '', text, flags=re.DOTALL)
# 去掉 markdown 标题行
body = re.sub(r'^#.*?\n', '', body)
chinese = len(re.findall(r'[\u4e00-\u9fff]', body))
total = len(body.strip())
print(f'{chinese} {total}')
")

    basename=$(basename "$file")
    echo "📄 $basename: 中文字数=$chinese, 总字符=$chars"

    total_chinese=$((total_chinese + chinese))
    total_chars=$((total_chars + chars))
done

if [ $# -gt 1 ]; then
    echo "---"
    echo "📊 合计: 中文字数=$total_chinese, 总字符=$total_chars"
fi
