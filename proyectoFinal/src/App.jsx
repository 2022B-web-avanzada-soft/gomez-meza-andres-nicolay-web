import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Card from "./components/Card";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="h-[90vh] flex gap-8 p-8 pt-0">
        <Sidebar />
        <div className="flex-1 h-full overflow-y-scroll">
          {/* Portada */}
          <div className="rounded-2xl mb-4 content-center">
            <img
              src="/logo.jpg"
              className="w-[500px] h-[500px] object-cover content-center md:object-top rounded-2xl"
            />
          </div>
          <div className="flex md:grid md:grid-cols-2 xl:flex items-center justify-around lg:justify-between flex-wrap gap-8">
            <Card
              img="https://image.api.playstation.com/vulcan/img/rnd/202011/0714/vuF88yWPSnDfmFJVTyNJpVwW.png"
              title="Marvel's Spider-Man"
              category="PS5"
              calification="9.5"
            />
            <Card
              img="https://m.media-amazon.com/images/I/91OWgMrKsQL.jpg"
              title="Little Nightmares II"
              category="PS4"
              calification="9.4"
            />
            <Card
              img="https://image.api.playstation.com/vulcan/ap/rnd/202010/0222/niMUubpU9y1PxNvYmDfb8QFD.png"
              title="Ghost of Tsushima"
              category="PS4"
              calification="8.9"
            />
            <Card
              img="https://media.vandal.net/m/82925/call-of-duty-warzone-20203102215835_1.jpg"
              title="Call of Duty: Warzone"
              category="PC"
              calification="6.0"
            />
            <Card
              img="https://image.api.playstation.com/vulcan/img/rnd/202111/0822/zDXM9K2cQiq0vKTDwF0TkAor.png"
              title="Fifa 22"
              category="Xbox Series X"
              calification="7.9"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
