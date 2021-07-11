/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { World, Chain, Vec2, Circle, Body } from 'planck-js';
import { Constants } from './constants';

@Injectable()
export class PlanckUtil {



  public SCALE = Constants.SCALE;

  constructor() {

  }


  createContainer(world: any): any {

    const h = window.innerHeight;
    const w = window.innerWidth;

    const container = world.createKinematicBody();
    container.createFixture( Chain(
      [
        Vec2(-35, -50),
        Vec2(-15, -59),
        Vec2(-15, -75),
        Vec2(15, -75),
        Vec2(15, -59),
        Vec2(35, -50),
        Vec2(40, 50),
        Vec2(-40, 50)
      ],
      true
    ));
    return container;
  }


  createScene(world: World, canvas: any): any {
    const h = canvas.height;
    const w = canvas.width;
    const container = world.createKinematicBody();
    container.createFixture(Chain(
      [
        Vec2(0, 0),
        Vec2(w / this.SCALE, 0),
        Vec2(w / this.SCALE, h / this.SCALE),
        Vec2(0, h / this.SCALE)
      ],
      true
    ));
    return container;
  }

  public createBall(world, rad, den, fric, rest) {
    const bola = world.createDynamicBody(
     Vec2(Math.random() * window.innerWidth / this.SCALE, Math.random() * window.innerHeight / this.SCALE / 2));
    const ballShape = Circle(rad);
    const ballFix = {
      density: den,
      friction: fric,
      restitution: rest
    };
    bola.createFixture(ballShape, ballFix);
    return bola;
  }

  public destroyBody(world: World, body: Body) {
    world.destroyBody(body);
  }


}
