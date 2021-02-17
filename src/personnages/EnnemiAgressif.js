class EnnemiAgressif extends Personnage {

	
	constructor(x, y, vitesse, rayon, physics, plateformes){
		super(x, y, vitesse, 'agressif', physics, plateformes);

		this.rayon = rayon;
	}

	agir(mario, rayon) {
		this.corp.body.allowGravity = true;
		//console.log("je suis agressif grrr grrr sale pédale");
		// si l'this.corp est dans un rayon de 'rayon' pixel autour du personnage
		if (Math.sqrt(Math.pow(mario.x - this.corp.x, 2) + Math.pow(mario.y - this.corp.y, 2)) < this.rayon) {
			if (mario.x - this.corp.x < -40) {	// si mario est à gauche de this.corp
				this.corp.setVelocityX(-this.vitesse);	//	this.corp va vers la gauche
			} else if (mario.x - this.corp.x > 40) {		// si mario est à droite de this.corp
				this.corp.setVelocityX(this.vitesse);	//	this.corp va vers la droite
			} else {
				this.corp.setVelocityX(0);	// sinon this.corp reste immobile
			}
		} else {
			this.corp.setVelocityX(0);	// sinon this.corp reste immobile
		}
	}

}