export default function Profile() {
  return (
    <div className="absolute inset-0 -z-10 ">
      <img
        src="https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg"
        alt=""
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 flex justify-center items-center">
        <div className=" p-6 rounded-lg shadow-2xl w-11/12 max-w-3xl">
          <div className="flex justify-center -mt-16">
            <img
              className="w-32 h-32 rounded-full border-4 border-white"
              src="https://placehold.co/100x100"
              alt="Profile picture"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="text-2xl font-semibold text-card-foreground">
              Jenna Stones
            </h2>
            <p className="text-muted-foreground">Los Angeles, California</p>
            <div className="mt-2">
              <p className="text-muted-foreground">
                <i className="fas fa-briefcase"></i> Solution Manager - Creative
                Tim Officer
              </p>
              <p className="text-muted-foreground">
                <i className="fas fa-university"></i> University of Computer
                Science
              </p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/80">
              Connect
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-muted-foreground">
              An artist of considerable range, Jenna the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
              records all of his own music, giving it a warm, intimate feel with
              a solid groove structure. An artist of considerable range.
            </p>
            <a href="#" className="text-primary hover:underline">
              Show more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
