import Activities from '../ui/Homepage/Activities';
import Projects from '../ui/Homepage/Projects';
import SEO from '../ui/SEO';

function HomePage() {
  return (
    <>
      <SEO
        title="Home"
        description="This is the home page of the website."
        keywords="home, page, keywords"
        author="Chirag Vijayvergiya"
      />
      <div className="min-h-screen overflow-x-auto overflow-y-hidden">
        <Activities />
        {/* <Projects /> */}
      </div>
    </>
  );
}

export default HomePage;
