class Personnage{


	constructor(x, y, vitesse, sprite, physics, plateformes){
		this.sprite = sprite;
		this.vitesse = vitesse;

		this.corp = physics.add.sprite(x, y, sprite);
		this.corp.setCollideWorldBounds(true);
		physics.add.collider(plateformes, this.corp);
	}


	agir() {
		this.corp.setVelocityX(0);
	}


}