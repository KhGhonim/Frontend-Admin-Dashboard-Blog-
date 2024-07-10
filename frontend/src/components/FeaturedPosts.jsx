
export default function FeaturedPosts() {
  return (
    <section className="bg-card text-card-foreground p-8">
    <h3 className="text-2xl font-bold mb-6">Featured Posts</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <article className="bg-background p-4 rounded-lg shadow-md">
        <img src="https://placehold.co/600x400" alt="Post 1 Image" className="rounded-lg mb-4"/>
        <h4 className="text-xl font-bold mb-2">Post Title 1</h4>
        <p className="text-muted-foreground mb-4">A brief description of the post content goes here.</p>
        <a href="#" className="text-primary hover:underline">Read More</a>
      </article>
      
      <article className="bg-background p-4 rounded-lg shadow-md">
        <img src="https://placehold.co/600x400" alt="Post 2 Image" className="rounded-lg mb-4"/>
        <h4 className="text-xl font-bold mb-2">Post Title 2</h4>
        <p className="text-muted-foreground mb-4">A brief description of the post content goes here.</p>
        <a href="#" className="text-primary hover:underline">Read More</a>
      </article>
      
      <article className="bg-background p-4 rounded-lg shadow-md">
        <img src="https://placehold.co/600x400" alt="Post 3 Image" className="rounded-lg mb-4"/>
        <h4 className="text-xl font-bold mb-2">Post Title 3</h4>
        <p className="text-muted-foreground mb-4">A brief description of the post content goes here.</p>
        <a href="#" className="text-primary hover:underline">Read More</a>
      </article>
    </div>
  </section>
  )
}
