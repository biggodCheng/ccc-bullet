/*
 * @Author: AK-12 
 * @Date: 2018-10-27 08:53:49 
 * @Last Modified by:   AK-12 
 * @Last Modified time: 2018-10-27 08:53:49 
 */
cc.Class({
  extends: cc.Component,

  properties: {
    hero: {
      default: null,
      type: cc.Sprite,
      displayName: '角色',
      tooltip: '要发射子弹的精灵'
    },
    bullet: {
      default: null,
      type: cc.Prefab,
      displayName: '子弹预制资源'
    },
    speed: {
      type: cc.Integer,
      default: 3,
      slide: true,
      min: 0,
      max: 10,
      step: 1,
      displayName: '子弹迟缓度',
      tooltip: '值越大, 子弹速度越慢'
    },
    interval: {
      type: cc.Integer,
      default: 3,
      slide: true,
      min: 0,
      max: 10,
      step: 1,
      displayName: '发射时间间隔'
    }
  },

  bulletPool: null,

  start() {
    this.bulletPool = []
    this.schedule(() => {
      this.addBullet()
    }, this.interval / 10)
    this.schedule(() => {
      this.removeBullet()
    }, this.interval / 10, cc.macro.REPEAT_FOREVER, this.interval / 10 + this.speed)
  },

  addBullet() {
    let bullet = cc.instantiate(this.bullet)
    bullet.parent = this.hero.node.parent
    let worldPoint = this.hero.node.parent.convertToWorldSpace(this.hero.node)
    bullet.position = worldPoint
    let fire = cc.moveTo(this.speed, cc.p(worldPoint.x, cc.winSize.height))
    bullet.runAction(fire)
    this.bulletPool.push(bullet)
  },

  removeBullet() {
    this.bulletPool[0].destroy()
    this.bulletPool.shift()
  }

});