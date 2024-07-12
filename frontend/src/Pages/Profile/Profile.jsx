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
              className="w-32 h-32 rounded-full border-4 object-cover border-white"
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSwQ1wr4ptQIAu8Ur2YA5dQISL3aQCGnDUYkxfAht66exHfF5hd"
              alt="Profile picture"
            />
          </div>
          <div className="text-center mt-2">
            <h2 className="text-2xl font-semibold ">Jenna Stones</h2>
            <p className="font-light">Los Angeles, California</p>
            <div className="mt-2">
              <p className="font-medium">
                <i className="fas fa-briefcase"></i> Solution Manager - Creative
                Tim Officer
              </p>
              <p className="font-bold">
                <i className="fas fa-university"></i> University of Computer
                Science
              </p>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="font-normal">
              An artist of considerable range, Jenna the name taken by
              Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and
              records all of his own music, giving it a warm, intimate feel with
              a solid groove structure. An artist of considerable range.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
