/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import * as planck from 'planck-js/dist/planck-with-testbed';
import { PlanckUtil } from '../../services/planck-util';

@Component({
  selector: 'app-pinball',
  templateUrl: './pinball.page.html',
  styleUrls: ['./pinball.page.scss'],
})
export class PinballPage implements OnInit {


  public pl: planck;
  public vec2: planck.Vec2;
  public container: planck.Body;
  public world: planck.World;
  public bola: planck.Body;
  public crankL: planck.Body;
  public crankR: planck.Body;
  public rightFlipper: planck.Body;
  public leftFlipper: planck.Body;

  public clickL = false;
  public clickR = false;

  constructor(
    public planckUtil: PlanckUtil
  ) {
    this.pl = planck;
    this.vec2 = this.pl.Vec2;
  }

  ngOnInit() {
    this.init();
  }

  public onClickL() {
    if (!this.clickL) {
      this.clickL = true;
    }
    this.crankL.setAngularVelocity(20000);
  }

  public onClickR() {
    if (!this.clickR) {
      this.clickR = true;
    }
    this.crankR.setAngularVelocity(-20000);
  }


  public onClickRestart() {

    this.planckUtil.destroyBody(this.world, this.bola);

    this.bola = this.planckUtil.createBall(this.world, 2, 2, 0.5, 0.2);

    // this.bola.applyForceToCenter(planck.Vec2(0, 100000));
  }


  private init() {

    planck.testbed('Mixer', (testbed) => {

      this.world = new this.pl.World(this.vec2(0, -10));

      testbed.y = 5;
      testbed.x = 0;
      testbed.width = 100;
      testbed.height = 120;

      this.container = this.planckUtil.createContainer(this.world);

      this.container.createFixture(this.pl.Circle(this.vec2(0, -40), 3));
      this.container.createFixture(this.pl.Circle(this.vec2(10, -10), 3));
      this.container.createFixture(this.pl.Box(3, 3, this.vec2(-10, 20)));
      this.container.createFixture(this.pl.Box(3, 3, this.vec2(10, 20)));


      const groundL = this.world.createBody(this.vec2(-22.5, -55));
      groundL.createFixture(this.pl.Box(12, 0.25, this.vec2(), -0.43), 0);
      const groundR = this.world.createBody(this.vec2(22.5, -55));
      groundR.createFixture(this.pl.Box(12, 0.25, this.vec2(), 0.43), 0);

      /* this.container.createFixture(pl.Edge(Vec2(-35, -50), Vec2(-12, -60)));*/
      this.crankL = this.world.createDynamicBody(this.vec2(-8, -60));
      this.crankL.createFixture(this.pl.Box(8, 1.0), 2);
      this.world.createJoint(this.pl.RevoluteJoint({}, this.container, this.crankL, this.vec2(-15.5, -60)));

      this.crankR = this.world.createDynamicBody(this.vec2(8, -60));
      this.crankR.createFixture(this.pl.Box(8, 1.0), 2);
      this.world.createJoint(this.pl.RevoluteJoint({}, this.container, this.crankR, this.vec2(15.5, -60)));


      this.bola = this.planckUtil.createBall(this.world, 2, 2, 0.5, 0.2);


      testbed.step = () => {
        // code to run in each game loop
        testbed.info('Use arrow keys to move player');
      };


      // container.setAngularVelocity(0.3);
      return this.world;
    });
  }






  private init2() {
    planck.testbed('Pinball', (testbed) => {

      testbed.y = -10;
      testbed.x = 0;
      testbed.width = 20;
      testbed.height = 50;

      const pl = planck;
      const Vec2 = pl.Vec2;
      this.world = new pl.World(Vec2(0, -5));

      // Ground body
      const ground = this.world.createBody();
      ground.createFixture(pl.Chain([
        Vec2(0.0, -4.0),
        Vec2(16, 12),
        Vec2(16, 40.0),
        Vec2(-16, 40.0),
        Vec2(-16, 12)
      ], true), 0.0);

      // Flippers
      const pLeft = Vec2(-2.0, 0.0);
      const pRight = Vec2(2.0, 0.0);

      this.leftFlipper = this.world.createDynamicBody(Vec2(-2.0, 0.0));
      this.rightFlipper = this.world.createDynamicBody(Vec2(2.0, 0.0));

      this.leftFlipper.createFixture(pl.Box(1.75, 0.1), 1.0);
      this.rightFlipper.createFixture(pl.Box(1.75, 0.1), 1.0);

      const jd = {};
      jd['enableMotor'] = true;
      jd['maxMotorTorque'] = 1000.0;
      jd['enableLimit'] = true;
      jd['motorSpeed'] = 0.0;

      jd['lowerAngle'] = -45.0 * Math.PI / 180.0;
      jd['upperAngle'] = 20.0 * Math.PI / 180.0;
      const leftJoint = pl.RevoluteJoint(jd, ground, this.leftFlipper, this.leftFlipper.getPosition());
      this.world.createJoint(leftJoint);

      jd['lowerAngle'] = -20.0 * Math.PI / 180.0;
      jd['upperAngle'] = 45.0 * Math.PI / 180.0;
      const rightJoint = pl.RevoluteJoint(jd, ground, this.rightFlipper, this.rightFlipper.getPosition());
      this.world.createJoint(rightJoint);

      // Circle character
      const ball = this.world.createBody({
        position: Vec2(1.0, 15.0),
        type: 'dynamic',
        bullet: true
      });
      ball.createFixture(pl.Circle(0.5), 1);




      testbed.step = () => {
        if (this.clickR === true) {
          rightJoint.setMotorSpeed(-20.0);
        } else {
          rightJoint.setMotorSpeed(2.0);
        }

        if (this.clickL === true) {
          leftJoint.setMotorSpeed(20.0);
        } else {
          leftJoint.setMotorSpeed(-2.0);
        }

        this.clickL = false;
        this.clickR = false;
      };

      return this.world;
    });
  }










}
