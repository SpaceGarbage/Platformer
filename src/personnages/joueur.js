class Joueur extends Personnage {


	constructor(x, y, vitesse, puissance_saut, physics, plateformes){
		super(x, y, vitesse, 'mario', physics, plateformes);
		this.corp.scale = 0.5; 

		this.puissance_saut = puissance_saut;
	}


	gererMouvements(cursors) {
		this.corp.setVelocityX(0);
		if (cursors.left.isDown) {
	        this.corp.setVelocityX(-this.vitesse);
	    } 
	    if (cursors.right.isDown) {
	        this.corp.setVelocityX(this.vitesse);
	    } 
	    if (cursors.space.isDown && this.corp.body.touching.down) {
	    	this.corp.setVelocityY(-this.puissance_saut);
	    }
	}

}