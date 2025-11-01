// src/utils/tokenManager.js
import { SignJWT, importPKCS8 } from 'jose';

class SimpleTokenManager {
  constructor() {
    this.config = {
      privateKey: import.meta.env.VITE_HF_PRIVATE_KEY,
      keyId: import.meta.env.VITE_HF_KEY_ID,
      projectId: import.meta.env.VITE_HF_PROJECT_ID
    };
    this.currentToken = null;
    this.tokenExpiry = null;
    // 添加环境变量验证
    this.validateConfig();
  }
  validateConfig() {
    const missingVars = [];

    if (!this.config.privateKey) missingVars.push('VITE_HF_PRIVATE_KEY');
    if (!this.config.keyId) missingVars.push('VITE_HF_KEY_ID');
    if (!this.config.projectId) missingVars.push('VITE_HF_PROJECT_ID');

    if (missingVars.length > 0) {
      console.error('❌ 缺少必要的环境变量:', missingVars.join(', '));
      throw new Error(`缺少环境变量: ${missingVars.join(', ')}`);
    }

    // console.log('✅ 环境变量检查通过');
  }

  async generateToken() {
    try {
      // console.log('🔧 开始生成 Token...', {
      //   hasPrivateKey: !!this.config.privateKey,
      //   keyId: this.config.keyId,
      //   projectId: this.config.projectId
      // });

      // 检查私钥格式
      if (!this.config.privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
        console.error('❌ 私钥格式可能不正确');
      }

      const privateKey = await importPKCS8(this.config.privateKey, 'EdDSA');
      // console.log('✅ 私钥导入成功');

      const iat = Math.floor(Date.now() / 1000) - 30;
      const exp = iat + 3600;

      // console.log('📝 创建 JWT payload:', { iat, exp });

      const token = await new SignJWT({
        sub: this.config.projectId,
        iat: iat,
        exp: exp
      })
        .setProtectedHeader({
          alg: 'EdDSA',
          kid: this.config.keyId
        })
        .sign(privateKey);

      this.currentToken = token;
      this.tokenExpiry = exp * 1000;

      // console.log('✅ Token生成成功', {
      //   tokenLength: token.length,
      //   expiry: new Date(this.tokenExpiry).toISOString()
      // });

      return token;
    } catch (error) {
      console.error('❌ Token生成失败:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      throw error;
    }
  }

  isTokenValid() {
    const isValid = this.currentToken && Date.now() < this.tokenExpiry;
    // console.log('🔍 Token有效性检查:', {
    //   hasToken: !!this.currentToken,
    //   expiry: this.tokenExpiry ? new Date(this.tokenExpiry).toISOString() : null,
    //   currentTime: new Date().toISOString(),
    //   isValid
    // });
    return isValid;
  }

  async getToken() {
    // 在调用前添加环境检测
    if (!window.crypto || !window.crypto.subtle) {
      console.error("Web Crypto API 不可用！需要 HTTPS 环境");
      // 降级方案：改用服务器端生成 token
    }
    // console.log('🔑 获取 Token...');
    if (this.isTokenValid()) {
      // console.log('✅ 使用缓存 Token');
      return this.currentToken;
    }
    // console.log('🔄 生成新 Token');
    return await this.generateToken();
  }
}

// 创建单例
export const tokenManager = new SimpleTokenManager();
