---
description: 将指定集数从 'soon' 改为 'online'，构建网站，提交并推送。用于故事发布上线的最后一步。
---

# 上线发布指定集数

将 $ARGUMENTS 指定的集数从 `status: 'soon'` 改为 `status: 'online'`，然后构建、提交、推送。

## 执行步骤

1. **解析参数**：从 `$ARGUMENTS` 中提取集数列表（空格或逗号分隔的数字）

2. **定位 episodes 文件**：
   - 优先查找 `site/src/data/episodes.ts`（faries-vs-witch 项目结构）
   - 备选 `website/src/content/stories/index.json`（powerpuff-bedtime-flights 项目结构）

3. **查找待发布集数**：
   - 在文件中搜索这些集数对应的 `status: 'soon'`
   - 如果某集已经是 `online`，跳过并提示
   - 如果找不到某集，报错

4. **展示变更预览**：列出将要上线的集数和标题，让用户确认

5. **执行状态变更**：
   - 对于 `.ts` 文件：用 Edit 工具将对应集数的 `status: 'soon'` 改为 `status: 'online'`
   - 对于 `.json` 文件：用 Edit 工具更新 status 字段

6. **构建网站**：
   ```bash
   cd site && npm run build 2>&1 | tail -5
   ```
   如果构建失败，停止并报告错误

7. **提交并推送**：
   ```bash
   git add site/src/data/episodes.ts
   git commit -m "🎬 第 X、Y 集上线：标题1 & 标题2"
   git push
   ```

## 注意事项

- 提交信息格式：`🎬 第 {集数} 集上线：{标题}`，多集用 `、` 连接
- 如果 episodes 文件在不同路径，先用 Glob 查找
- 构建失败时不提交，先修复问题
