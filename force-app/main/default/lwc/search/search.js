import { LightningElement, track } from 'lwc';
import autoAnimate from 'c/autoanimate';

export default class Search extends LightningElement {
    aaInitialized = false;
    sortBy = 'rating';
    sortOptions = [
        { label: 'Title', value: 'title' },
        { label: 'Year', value: 'year' },
        { label: 'Rating', value: 'rating' },
        { label: 'Director', value: 'director' }
    ];
    searchTerm = '';
    @track movies = [
        { imdbId: 'tt0111161', title: 'The Shawshank Redemption', year: 1994, rating: 9.3, director: 'Frank Darabont' },
        { imdbId: 'tt0068646', title: 'The Godfather', year: 1972, rating: 9.2, director: 'Francis Ford Coppola' },
        { imdbId: 'tt0071562', title: 'The Godfather: Part II', year: 1974, rating: 9.0, director: 'Francis Ford Coppola' },
        { imdbId: 'tt0468569', title: 'The Dark Knight', year: 2008, rating: 9.0, director: 'Christopher Nolan' },
        { imdbId: 'tt0050083', title: '12 Angry Men', year: 1957, rating: 8.9, director: 'Sidney Lumet' },
        { imdbId: 'tt0108052', title: 'Schindler\'s List', year: 1993, rating: 8.9, director: 'Steven Spielberg' },
        { imdbId: 'tt0167260', title: 'The Lord of the Rings: The Return of the King', year: 2003, rating: 8.9, director: 'Peter Jackson' },
        { imdbId: 'tt0120737', title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, rating: 8.8, director: 'Peter Jackson' },
        { imdbId: 'tt0167261', title: 'The Lord of the Rings: The Two Towers', year: 2002, rating: 8.7, director: 'Peter Jackson' },
        { imdbId: 'tt0080684', title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980, rating: 8.7, director: 'Irvin Kershner' },
        { imdbId: 'tt0109830', title: 'Forrest Gump', year: 1994, rating: 8.8, director: 'Robert Zemeckis' },
        { imdbId: 'tt1375666', title: 'Inception', year: 2010, rating: 8.8, director: 'Christopher Nolan' },
        { imdbId: 'tt0133093', title: 'The Matrix', year: 1999, rating: 8.7, director: 'The Wachowskis' },
        { imdbId: 'tt0099685', title: 'Goodfellas', year: 1990, rating: 8.7, director: 'Martin Scorsese' },
        { imdbId: 'tt0073486', title: 'One Flew Over the Cuckoo\'s Nest', year: 1975, rating: 8.7, director: 'Milos Forman' },
        { imdbId: 'tt0047478', title: 'Seven Samurai', year: 1954, rating: 8.6, director: 'Akira Kurosawa' },
        { imdbId: 'tt0076759', title: 'Star Wars: Episode IV - A New Hope', year: 1977, rating: 8.6, director: 'George Lucas' },
        { imdbId: 'tt0114369', title: 'Se7en', year: 1995, rating: 8.6, director: 'David Fincher' },
        { imdbId: 'tt0038650', title: 'It\'s a Wonderful Life', year: 1946, rating: 8.6, director: 'Frank Capra' },
        { imdbId: 'tt0102926', title: 'The Silence of the Lambs', year: 1991, rating: 8.6, director: 'Jonathan Demme' },
        { imdbId: 'tt0118799', title: 'Life Is Beautiful', year: 1997, rating: 8.6, director: 'Roberto Benigni' },
        { imdbId: 'tt0110912', title: 'Pulp Fiction', year: 1994, rating: 8.9, director: 'Quentin Tarantino' },
        { imdbId: 'tt0120815', title: 'Saving Private Ryan', year: 1998, rating: 8.6, director: 'Steven Spielberg' },
        { imdbId: 'tt0816692', title: 'Interstellar', year: 2014, rating: 8.6, director: 'Christopher Nolan' }
    ];

    get filteredMovies() {
        return this.movies.filter(movie => movie.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
            movie.year.toString().includes(this.searchTerm) ||
            movie.director.toLowerCase().includes(this.searchTerm.toLowerCase())).map(movie => ({
                ...movie,
                imdbUrl: `https://www.imdb.com/title/${movie.imdbId}/`
            })).sort((a, b) => {
                if (this.sortBy === 'title') {
                    return a.title.localeCompare(b.title);
                } else if (this.sortBy === 'year') {
                    return a.year - b.year;
                } else if (this.sortBy === 'rating') {
                    return b.rating - a.rating;
                } else if (this.sortBy === 'director') {
                    return a.director.localeCompare(b.director);
                }
            });
    }

    handleSearch(event) {
        this.searchTerm = event.target.value;
    }

    handleSortChange(event) {
        this.sortBy = event.target.value;
    }

    renderedCallback() {
        if (this.aaInitialized) {
            return;
        }
        const animContainer = this.template.querySelector('.animContainer');
        if (!animContainer) {
            return;
        }
        autoAnimate(animContainer);
        this.aaInitialized = true;
    }
}