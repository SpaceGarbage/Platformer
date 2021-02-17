

var config = {
    type: Phaser.AUTO,
    width: LARGEUR_CANVAS,
    height: HAUTEUR_CANVAS,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
	scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors, mario, terreman;
var plateformes;
var ennemies;

let agressif, peureux, sauteur, volant, tireur;


function preload () {
	this.load.image('mario', 'images/player2+.png');
	this.load.image('plateformeverte', 'images/plateforme.png');
	this.load.image('landscape', 'images/Forest_Landscapesv2.png');
	this.load.image('plateformespace', 'images/spaceplatform2.png');

	this.load.image('agressif', 'images/agressif2+.png');
	this.load.image('peureux', 'images/peureux2+.png');
	this.load.image('sauteur', 'images/sauteur2+.png');
	this.load.image('volant', 'images/volant2+.png');
	this.load.image('tireur', 'images/tireur2+.png');

	//this.load.spritesheet('peureuxanimleft', 'images/peureuxanimleft2.png', { frameWidth: 32*4, frameHeight: 32*4 });
}

function create () {
	//affichage du décor de fond
	this.add.image(800, 300, 'landscape');


	// création des plateformes
	plateformes = this.physics.add.staticGroup();

	plateformes.create(200, 580, 'plateformespace');//.setScale(3);		//\=-____\sol
	plateformes.create(700, 580, 'plateformespace');					///=-	 /sol
	plateformes.create(1200, 580, 'plateformespace');

	plateformes.create(0, 150, 'plateformespace');
	plateformes.create(1000, 400, 'plateformespace');			//setScale(1.5, 0.2);
	//plateformes.scaleX(2);
	//console.log(plateformes.children.entries[3]);


	// création des personnages
	mario = new Joueur(	250, 350, //x, y depart
						250, 400, //vitesse, puissance saut
						this.physics, plateformes);

	pagressif = new EnnemiAgressif(	700, 80,	//x, y depart
									150, 600, 	//vitesse, rayon
									this.physics, plateformes);

	ppeureux = new EnnemiPeureux(	100, 80,
									350, 400, //vitesse, rayon
									0, 400,	// debut/fin plateforme (null, null: pour tout le plateau)
									this.physics, plateformes, 'peureux');

	psauteur = new EnnemiSauteur(	200, 300,
									0, 400, //vitesse, puissance saut
									this.physics, plateformes);

	pvolant = new EnnemiVolant(	800, 80,
								300, 60, //vitesse, altitude
								this.physics, plateformes);

	ptireur = new EnnemiTireur(	800, 80,
								350, 400, //vitesse, altitude
								600, 1400,	// debut/fin plateforme (null, null: pour tout le plateau)
								this.physics, plateformes, 'tireur');


	// créer le lecteur des evennements du clavier
	cursors = this.input.keyboard.createCursorKeys();


}


function update () {
	mario.gererMouvements(cursors);

	pagressif.agir(mario.corp);
	ppeureux.agir(mario.corp);
	psauteur.agir();
	pvolant.agir();
	ptireur.agir(mario.corp)

}
