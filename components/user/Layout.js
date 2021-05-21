import ProjectHead from '../projectHead';
import Navbar from './Navbar';

export default function AdminLayout({ children }) {
  return (
    <>
      {/* import head section */}
      <ProjectHead title="VHS Movies" />
      {/* render top navbar component */}
      <Navbar />
      {/* render top navbar component */}

      <div>{children}</div>
    </>
  );
}
