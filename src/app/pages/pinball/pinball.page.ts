import { Component, OnInit } from '@angular/core';
import * as planck from 'planck-js/dist/planck-with-testbed';

@Component({
  selector: 'app-pinball',
  templateUrl: './pinball.page.html',
  styleUrls: ['./pinball.page.scss'],
})
export class PinballPage implements OnInit {



  public container: planck.Body;
  public world: planck.World;
  public bola: planck.Body;
  public crankL: planck.Body;
  public crankR: planck.Body;

  constructor(
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private init() {
    planck.testbed('Mixer', (testbed) => {
      const pl = planck, Vec2 = pl.Vec2;
      this.world = new pl.World(Vec2(0, -20));

      testbed.y = 5;
      testbed.x = 0;
      testbed.width = 80;
      testbed.height = 100;

      this.container = this.world.createKinematicBody();
      this.container.createFixture(pl.Circle(Vec2(0, -40), 3));
      this.container.createFixture(pl.Circle(Vec2(10, -10), 3));
      this.container.createFixture(pl.Box(3, 3, Vec2(-10, 20)));
      this.container.createFixture(pl.Box(3, 3, Vec2(10, 20)));
      this.container.createFixture(pl.Chain(
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

      var ground = this.world.createBody(Vec2(-22.5, -55));
      ground.createFixture(pl.Box(12, 0.25, Vec2(), -0.43), 0);
      var ground = this.world.createBody(Vec2(22.5, -55));
      ground.createFixture(pl.Box(12, 0.25, Vec2(), 0.43), 0);

      /* this.container.createFixture(pl.Edge(Vec2(-35, -50), Vec2(-12, -60)));*/
      this.crankL = this.world.createDynamicBody(Vec2(-8, -60));
      this.crankL.createFixture(pl.Box(8, 1.0), 2);
      this.world.createJoint(pl.RevoluteJoint({}, this.container, this.crankL, Vec2(-15.5, -60)));

      this.crankR = this.world.createDynamicBody(Vec2(8, -60));
      this.crankR.createFixture(pl.Box(8, 1.0), 2);
      this.world.createJoint(pl.RevoluteJoint({}, this.container, this.crankR, Vec2(15.5, -60)));


      this.bola = this.world.createDynamicBody(Vec2(-10, 10));
      const ballShape = pl.Circle(2);
      const ballFix = {
        density: 2,
        friction: 1,
        restitution: 0.2
      };

      this.bola.createFixture(ballShape, ballFix);

      /*       this.bola.setMassData({
              mass: 0.5,
              center: Vec2(),
              I: 0.4
            }); 
    */



      testbed.step = () => {
        // code to run in each game loop
        testbed.info('Use arrow keys to move player');
      };


      // container.setAngularVelocity(0.3);
      return this.world;
    });
  }




  init2() {
    planck.testbed('Pinball', function(testbed) {
      const pl = planck, Vec2 = pl.Vec2;
      const world = new pl.World(Vec2(0, -10));
    
      // Ground body
      const ground = world.createBody();
      ground.createFixture(pl.Chain([
        Vec2(0.0, -2.0),
        Vec2(8.0, 6.0),
        Vec2(8.0, 20.0),
        Vec2(-8.0, 20.0),
        Vec2(-8.0, 6.0)
      ], true), 0.0);
    
      // Flippers
      const pLeft = Vec2(-2.0, 0.0);
      const pRight = Vec2(2.0, 0.0);
    
      const leftFlipper = world.createDynamicBody(Vec2(-2.0, 0.0));
      const rightFlipper = world.createDynamicBody(Vec2(2.0, 0.0));
    
      leftFlipper.createFixture(pl.Box(1.75, 0.1), 1.0);
      rightFlipper.createFixture(pl.Box(1.75, 0.1), 1.0);
    
      const jd = {};
      jd['enableMotor'] = true;
      jd['maxMotorTorque']  = 1000.0;
      jd['enableLimit']  = true;
      jd['motorSpeed']  = 0.0;
    
      jd['lowerAngle']  = -30.0 * Math.PI / 180.0;
      jd['upperAngle']  = 5.0 * Math.PI / 180.0;
      var leftJoint = pl.RevoluteJoint(jd, ground, leftFlipper, leftFlipper.getPosition());
      world.createJoint(leftJoint);
    
      jd['lowerAngle']  = -5.0 * Math.PI / 180.0;
      jd['upperAngle']  = 30.0 * Math.PI / 180.0;
      const rightJoint = pl.RevoluteJoint(jd, ground, rightFlipper, rightFlipper.getPosition());
      world.createJoint(rightJoint);
    
      // Circle character
      const ball = world.createBody({
        position : Vec2(1.0, 15.0),
        type : 'dynamic',
        bullet : true
      });
      ball.createFixture(pl.Circle(0.2), 1.0);
    
      testbed.step = function() {
        if (testbed.activeKeys.right) {
          rightJoint.setMotorSpeed(-20.0);
        } else {
          rightJoint.setMotorSpeed(10.0);
        }
    
        if (testbed.activeKeys.left) {
          leftJoint.setMotorSpeed(20.0);
        } else {
          leftJoint.setMotorSpeed(-10.0);
        }
      }
    
      return world;
    });
  }







  public onClickL() {
    this.crankL.setAngularVelocity(20000);
  }

  public onClickR() {
    this.crankR.setAngularVelocity(-20000);
  }

  public onClickRestart() {
    this.bola.applyForceToCenter( planck.Vec2(0 , 100000))
  }


}
