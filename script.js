const musica = document.getElementById('musica');
const input = document.getElementById('input');

function tocarMusica() {
    if (musica) {
        musica.play();
    }
}

function buscarPokemon() {
    tocarMusica();

    const nome = input.value.trim().toLowerCase();

    if (!nome) {
        alert('Digite o nome de um Pokémon.');
        return;
    }

    fetch('https://pokeapi.co/api/v2/pokemon/' + nome)
        .then(function(resposta) {
            if (!resposta.ok) throw new Error('Pokemon nao encontrado');
            return resposta.json();
        })

        .then(function(pokemon) {
            const tipos = pokemon.types.map(function(tipo) {
                return tipo.type.name.toUpperCase();
            }).join(' / ');

            document.getElementById('nome-pokemon').textContent = pokemon.name.toUpperCase();
            document.getElementById('imagem-pokemon').src = pokemon.sprites.other.showdown.front_default;
            document.getElementById('ataque').textContent = pokemon.stats[1].base_stat;
            document.getElementById('defesa').textContent = pokemon.stats[2].base_stat;
            document.getElementById('velocidade').textContent = pokemon.stats[5].base_stat;
            document.getElementById('saude').textContent = pokemon.stats[0].base_stat;
            document.getElementById('tipo').textContent = tipos;
        })
        .catch(function() {
            alert('Pokemon nao encontrado.');
        });
}
