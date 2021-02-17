class EnnemiSauteur extends Personnage {


	constructor(x, y, vitesse, puissance_saut, physics, plateformes){
		super(x, y, vitesse, 'sauteur', physics, plateformes);

		this.hauteur_sauts = [0.5*puissance_saut, puissance_saut, 0.5*puissance_saut];
		this.idsaut = 0;
	}


	agir() {
		this.corp.body.allowGravity = true;
		if (this.corp.body.touching.down) {
			this.corp.setVelocityY(-this.hauteur_sauts[this.idsaut]);
			this.idsaut = (this.idsaut+1)%this.hauteur_sauts.length;
		}
	}

}