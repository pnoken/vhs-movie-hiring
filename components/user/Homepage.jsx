import Navbar from './Navbar'
import ProjectHead from '../projectHead';
import MovieList from './MovieList';

const Homepage = () => {
    return (
        <div>
            <ProjectHead/>
            <Navbar/>
            <MovieList/>
        </div>
    )
}

export default Homepage
