# Docker 部署指南

本文档说明如何使用 Docker 部署 Next.js 应用。

## 文件说明

- `Dockerfile` - 标准模式 Dockerfile（使用完整 node_modules）
- `Dockerfile.standalone` - Standalone 模式 Dockerfile（推荐，镜像更小）
- `.dockerignore` - Docker 构建时忽略的文件
- `docker-compose.example.yml` - Docker Compose 配置示例

## 快速开始

### 方式一：标准模式（使用 Dockerfile）

```bash
# 构建镜像
docker build \
  --build-arg NEXT_PUBLIC_ADYEN_CLIENT_KEY=your_key \
  --build-arg MAGENTO_ENDPOINT=your_endpoint \
  --build-arg NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE=your_store_code \
  -t nextjs-healess:latest .

# 运行容器
docker run -p 3000:3000 \
  -e MAGENTO_ENDPOINT=your_endpoint \
  -e NEXT_PUBLIC_ADYEN_CLIENT_KEY=your_key \
  nextjs-healess:latest
```

### 方式二：Standalone 模式（推荐，镜像更小）

**首先，需要在 `next.config.js` 中添加 standalone 输出：**

```js
const nextConfig = {
  output: 'standalone',  // 添加这一行
  // ... 其他配置
};
```

然后使用 `Dockerfile.standalone`：

```bash
# 构建镜像
docker build \
  -f Dockerfile.standalone \
  --build-arg NEXT_PUBLIC_ADYEN_CLIENT_KEY=your_key \
  --build-arg MAGENTO_ENDPOINT=your_endpoint \
  -t nextjs-healess:latest .

# 运行容器
docker run -p 3000:3000 \
  -e MAGENTO_ENDPOINT=your_endpoint \
  -e NEXT_PUBLIC_ADYEN_CLIENT_KEY=your_key \
  nextjs-healess:latest
```

### 方式三：使用 Docker Compose

1. 复制示例配置文件：
```bash
cp docker-compose.example.yml docker-compose.yml
```

2. 创建 `.env` 文件（如果还没有）：
```env
NEXT_PUBLIC_ADYEN_CLIENT_KEY=your_key
MAGENTO_ENDPOINT=your_endpoint
NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE=your_store_code
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

3. 启动服务：
```bash
docker-compose up -d
```

## 构建参数说明

以下参数可以在构建时通过 `--build-arg` 传递：

- `NEXT_PUBLIC_ADYEN_CLIENT_KEY` - Adyen 客户端密钥
- `MAGENTO_ENDPOINT` - Magento API 端点
- `NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE` - 默认商店代码
- `NEXTAUTH_SECRET` - NextAuth 密钥
- `NEXTAUTH_URL` - NextAuth URL

## 运行时环境变量

以下环境变量需要在容器运行时设置：

- `MAGENTO_ENDPOINT` - Magento API 端点
- `NEXT_PUBLIC_ADYEN_CLIENT_KEY` - Adyen 客户端密钥（前端可见）
- `NEXT_SERVER_MAGENTO_DEFAULT_STORE_CODE` - 默认商店代码
- `NEXTAUTH_SECRET` - NextAuth 密钥
- `NEXTAUTH_URL` - NextAuth URL

## 优化建议

1. **使用 Standalone 模式**：可以显著减小镜像大小（从 ~500MB 降到 ~150MB）
2. **使用多阶段构建**：已包含在 Dockerfile 中，自动优化
3. **使用 .dockerignore**：已创建，排除不必要的文件
4. **使用非 root 用户运行**：已配置，提高安全性

## 生产环境部署

### 在 Kubernetes 中部署

可以基于 Dockerfile 创建 Kubernetes Deployment 和 Service 配置。

### 在云平台部署

大多数云平台（AWS ECS、Google Cloud Run、Azure Container Instances）都支持直接使用 Dockerfile。

## 故障排查

1. **构建失败**：检查构建参数是否正确传递
2. **运行时错误**：检查环境变量是否设置
3. **端口冲突**：修改 `-p` 参数中的端口映射
4. **权限问题**：确保使用非 root 用户（已配置）

## 镜像大小对比

- 标准模式：~500-600MB
- Standalone 模式：~150-200MB

推荐使用 Standalone 模式以获得更小的镜像和更快的部署速度。
