<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 用户头像区域 -->
      <div class="avatar-box">
        <img src="../assets/img/logo.png" alt="头像">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" label-width="0px" class="login-input" :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont iconuser-fill" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 用户密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont iconlock-fill" v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <!-- 登录、重置按钮 -->
        <el-form-item class="login-button">
          <el-button type="info" @click="resetLoginForm">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单输入格式验证
      loginFormRules: {
        // 用户名规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        // 密码规则
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单重置
    resetLoginForm () {
      // console.log(this)
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 表单预验证:即在点击登录发送请求之前对输入的账号密码进行预验证
      // .loginFormRef可以拿到表单引用对象
      // valid为布尔值,即表单预验证的结果
      this.$refs.loginFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return
        // const res = await this.$http.post('login', this.loginForm)
        // 使用解构赋值
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)
        if (res.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        // 保存token
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转到 home
        this.$router.push('/main')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
    background-color: #264A6B;
    height: 100%;
}
.login-box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar-box{
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img{
    border-radius: 50%;
    background-color: #eee;
    width: 100%;
    height: 100%;
  }
}
.login-input{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.login-button{
  display: flex;
  justify-content: space-between;
}

</style>

