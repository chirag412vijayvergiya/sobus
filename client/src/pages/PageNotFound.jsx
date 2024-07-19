// import SEO from '../ui/SEO';

function PageNotFound() {
  return (
    <>
      {/* <SEO
        title="404"
        description="This is the page not found page of the website."
        keywords="page not found, page, keywords"
        author="Chirag Vijayvergiya"
      /> */}

      <div className="fixed inset-0 flex flex-col items-center justify-center gap-1">
        <img src="/PageNotFound.png" alt="404" className="mb-5 h-[15rem]" />
        <h1 className="text-2xl font-semibold">Page Not Found</h1>
        <h4 className="text-md mx-3 tracking-wider">
          Sorry, but we can't find the page you are looking for... 🙃
        </h4>
      </div>
    </>
  );
}

export default PageNotFound;
