import { RandomGen6Teams } from '../gen6/teams';

export class RandomGen6MegaTeams extends RandomGen6Teams {
	override randomTeam() {
		const team = super.randomTeam();
		
		// Force at least one Mega per team
		const megaPokemon = [
			'venusaur', 'charizard', 'blastoise', 'alakazam', 'gengar', 'kangaskhan', 'pinsir',
			'gyarados', 'aerodactyl', 'mewtwo', 'ampharos', 'scizor', 'heracross', 'houndoom',
			'tyranitar', 'blaziken', 'gardevoir', 'mawile', 'aggron', 'medicham', 'manectric',
			'banette', 'absol', 'garchomp', 'lucario', 'abomasnow', 'beedrill', 'pidgeot',
			'slowbro', 'steelix', 'sceptile', 'swampert', 'sableye', 'sharpedo', 'camerupt',
			'altaria', 'glalie', 'salamence', 'metagross', 'latias', 'latios', 'rayquaza',
			'lopunny', 'gallade', 'audino', 'diancie'
		];
		
		let hasMega = false;
		for (const set of team) {
			if (set.item && set.item.endsWith('ite')) {
				hasMega = true;
				break;
			}
		}
		
		if (!hasMega) {
			// Find a Pokemon that can Mega and give it a Mega Stone
			for (const set of team) {
				const speciesId = set.species.toLowerCase();
				if (megaPokemon.includes(speciesId)) {
					set.item = speciesId + 'ite';
					break;
				}
			}
		}
		
		return team;
	}
}

export default RandomGen6MegaTeams;

