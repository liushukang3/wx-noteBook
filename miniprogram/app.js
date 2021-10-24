//app.js
App({
    onLaunch: async function() {

        if (!wx.cloud) {
            //console.error('请使用 2.2.3 或以上的基础库以使用云能力')
        } else {
            wx.cloud.init({
                // env 参数说明：
                //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
                //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
                //   如不填则使用默认环境（第一个创建的环境）
                // env: 'my-env-id',
                traceUser: true,
            })
        }

        // 全局对象
        this.globalData = {}

        // 如果是2.10.4以上的基础库
        if(wx.getUserProfile){

            this.globalData.isAuth = await this.hasUserInfo();
    
            if(this.isAuthCB){
                this.isAuthCB()
            }
        }else{
            // 获取用户授权信息(旧版获取授权)
            wx.getSetting({

                success: res => {
                    this.globalData.isAuth = res.authSetting['scope.userInfo'];
                    // 添加回调函数isAuthCB(名字自定义)，有则执行
                    if(this.isAuthCB){
                        this.isAuthCB(res)
                    }
                }
            })
        }


    },

    //获取用户授权信息
    hasUserInfo: async function () { 
        if (this.globalData.userInfo && this.globalData.userInfo.nickName && this.globalData.userInfo.avatarUrl) return true
       
        let res = await await wx.cloud.callFunction({ name: 'get_user' })
        let data = res.result.data && res.result.data.length > 0 ? res.result.data[0] : {};
        if (data.nickName && data.avatarUrl) {
          this.globalData.userInfo = data;
          return true 
        } else { 
          return false 
        }
      },
})