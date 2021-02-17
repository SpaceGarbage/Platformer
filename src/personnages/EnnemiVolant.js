class EnnemiVolant extends Personnage {


	constructor(x, y, vitesse, altitude, physics, plateformes){
		super(x, y, vitesse, 'volant', physics, plateformes);

		this.altitude = altitude;
		this.direction = 1;
		this.temps_dash = 70; 
		this.temps_non_dash = 0;
		this.pixelDemiTour = 100;
		this.frame_dash = 0;
	}


	agir() {
		this.corp.body.allowGravity = false;
		//console.log(LARGEUR_CANVAS + this.direction);

		if (this.temps_non_dash == 0) {
			this.temps_non_dash = Math.floor((Math.random() * 500) + 300);
			this.frame_dash = this.temps_dash;
		} else {
			this.temps_non_dash--;
		}


		if (this.corp.y > this.altitude) {
			this.corp.setVelocityY(-100);
		} else {
			this.corp.setVelocityY(0);
		}

		if (this.corp.x < this.pixelDemiTour) {
			this.direction = 1;
		} else if ((LARGEUR_CANVAS - this.corp.x) < this.pixelDemiTour) {
			this.direction = -1;
		}

		if (this.frame_dash == 0) {
			this.corp.setVelocityX(this.vitesse * this.direction);
		} else {
			this.corp.setVelocityX((this.vitesse*3) * this.direction);
			this.frame_dash--;
		}
	}

}