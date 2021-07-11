/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable object-shorthand */
import { Component, OnInit } from '@angular/core';
import { World, Vec2, Body } from 'planck-js';
import Renderer, { Runner, CanvasRenderer, SVGRenderer } from 'planck-renderer';
import { Constants } from '../../services/constants';
import { PlanckUtil } from '../../services/planck-util';

@Component({
  selector: 'app-prueba-render',
  templateUrl: './prueba-render.page.html',
  styleUrls: ['./prueba-render.page.scss'],
})
export class PruebaRenderPage implements OnInit {

  public canvas: any;

  public world: World;
  public container: Body;
  public ball: Body;
  public balls: Body[] = [];

  public SCALE = Constants.SCALE;


  constructor(
    public planckUtil: PlanckUtil
  ) { }

  async ngOnInit() {

    this.canvas = document.querySelector('#test');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.world = new World(Vec2(0, 9.8));

    const ctx = this.canvas.getContext('2d');
    ctx.translate(-1, -1);


    const options = {
      scale: this.SCALE,
      strokeStyle: {
        dynamic: 'green',
        static: 'black',
        kinematic: 'black',
      },
    };
    const renderer = new Renderer(this.world, ctx, options);

    const runner = new Runner(this.world, {
      // default settings
      speed: 1,
      fps: 60,
    });
    runner.start(() => {
      renderer.renderWorld();
      console.log('render');
    });

    this.container = this.planckUtil.createScene(this.world, this.canvas);

    this.ball = this.planckUtil.createBall(this.world, 1, 1, 0, 0.5);
    this.ball.applyForceToCenter(Vec2(1000, 0));

    this.ball = this.planckUtil.createBall(this.world, 1, 1, 0, 0.5);
    this.ball.applyForceToCenter(Vec2(900, 0));


    /*     for (let index = 0; index < 2; index++) {
          const ball = this.planckUtil.createBall(this.world, 1, 1, 0, 0.9);
          ball.applyForceToCenter(Vec2(10000 * (Math.random() - 0.5), 0));
          this.balls.push(ball);
          await this.delay(200);
        } */

  }

  public async delay(ms) {
    return new Promise(async (resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }

  public async onClickBeleteBalls() {
    for (const ball of this.balls) {
      this.planckUtil.destroyBody(this.world, ball);
    }
    for (let index = 0; index < 2; index++) {
      const ball = this.planckUtil.createBall(this.world, 1, 1, 0, 0.9);
      ball.applyForceToCenter(Vec2(10000 * (Math.random() - 0.5), 0));
      this.balls.push(ball);
      await this.delay(200);
    }
  }

}
