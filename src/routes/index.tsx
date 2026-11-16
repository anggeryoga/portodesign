import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareText } from "lucide-react";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Discogs — Electronic Music Database" },
      {
        name: "description",
        content: "Browse electronic music labels, artists, releases, comments, and reviews.",
      },
      { property: "og:title", content: "Discogs — Electronic Music Database" },
      {
        property: "og:description",
        content: "Browse electronic music labels, artists, releases, comments, and reviews.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const letters = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "#"];

const additions = [
  ["Talla 2XLC", "Love's Comin' Down Remixes", "Techno Club"],
  ["D.A.4", "Funzone", "Techno Club"],
  ["Jephte Guillaume And The Tet Kale Orkestra", "Voyage Of Dreams", "Spiritual Life Music"],
  ["Bang Bang", "Je T'aime Je T'aime", "Yellow Productions"],
  ["DJ Taucher", "Life Is A Remix Phase II", "Scuba Records"],
  ["Wendy Carlos", "Sonic Seasonings+", "East Side"],
  ["DJ Taucher", "Life Is A Remix Phase I", "Scuba Records"],
  ["Roy Davis Jr", "Roy's Unreleased Traxx Vol 1", "Force Inc US"],
  ["Cajmere", "Look' For A Man", "Not On Label"],
  ["Laurent Garnier", "The Hoe", "F Communications"],
];

const comments = [
  ["Biosphere - Cirque", "IoaPetraka", "Cirque is a lot different from Substrata, in many ways. It, in my opinion, ..."],
  ["Ladytron", "tower_restaurant", "This album is neither kitsch, camp, or casio. A collection of excellent an..."],
  ["Medway", "radius", 'THE TRACK "RESURRECTION \'99" IS ALSO FEATURED ON THE "GLOBAL UNDERGROUND-SA...'],
  ["Autechre - Peel Session", "IoaPetraka", 'When I first got in to the "IDM" sound, I was told to check out Autechre. S...'],
  ["Andrew McLauchlan - Love Story", "djPimpDaddy", "Where do you find this record? I have been trying to find this on vinyl fo..."],
];

function ClassicLink({ children }: { children: React.ReactNode }) {
  return (
    <a className="classic-link" href="#">
      {children}
    </a>
  );
}

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [message, setMessage] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(query.trim() ? `Searching ${category} for “${query.trim()}”...` : "Please enter something to search.");
  }

  return (
    <div className="discogs-page">
      <header className="discogs-header">
        <a className="discogs-brand" href="/" aria-label="Discogs home">
          Disc<span className="brand-record" aria-hidden="true" />gs
        </a>
        <p className="discogs-tagline">building the definitive electronic music database...</p>
        <div className="account-links">
          <strong>Guest</strong> | <ClassicLink>Register</ClassicLink> | <ClassicLink>Log In</ClassicLink>
        </div>
      </header>

      <nav className="classic-nav" aria-label="Main navigation">
        {["About", "Help", "Stats", "My Discogs", "Forums", "Links"].map((item, index) => (
          <span key={item}>
            {index > 0 && <span className="px-1 text-xs font-normal">|</span>}
            <ClassicLink>{item}</ClassicLink>
          </span>
        ))}
      </nav>

      <form className="classic-search" onSubmit={handleSearch}>
        <label htmlFor="search-query">Search:</label>
        <select aria-label="Search category" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option>All</option>
          <option>Artists</option>
          <option>Labels</option>
          <option>Releases</option>
        </select>
        <input id="search-query" value={query} onChange={(event) => setQuery(event.target.value)} />
        <Button className="classic-search-button" type="submit">Go</Button>
      </form>

      <main className="classic-main">
        <aside className="classic-sidebar">
          <div className="col-span-full md:hidden">
            <h1 className="text-sm font-bold">Welcome to Discogs</h1>
          </div>
          <section className="sidebar-box">
            <h2>How can I help?</h2>
            <p>DJ's, record collectors, trainspotters, you can help Discogs grow by submitting missing <strong>labels</strong>, <strong>releases</strong>, and your <strong>music reviews</strong>. Discogs is 100% user-built. And you can be a part of it. <strong><ClassicLink>Join Now</ClassicLink></strong></p>
            <p>If you have questions, comments, or need help using Discogs then please post a message in our <strong><ClassicLink>feedback forum</ClassicLink></strong>.</p>
          </section>
          <section className="sidebar-box">
            <h2>Statistics</h2>
            <p>3,582 labels<br />18,200 releases<br />16,076 artists<br /><ClassicLink>763 contributors</ClassicLink></p>
            <p><ClassicLink>Items Pending</ClassicLink></p>
            <p>Updated:<br />Nov 28, 2001 10:39 AM</p>
          </section>
        </aside>

        <section className="classic-content">
          <div className="welcome-row">
            <div>
              <h1 className="hidden text-sm font-bold md:block">Welcome to Discogs</h1>
              <p>We're on a mission to build the biggest and most comprehensive electronic music database. Imagine a site with discographies of all labels, all artists, all cross-referenced. It's getting closer every day. <strong><em><ClassicLink>Learn more...</ClassicLink></em></strong></p>
            </div>
            <div className="share-box">
              <MessageSquareText className="float-left mr-1 mt-0.5 size-4 text-primary" aria-hidden="true" />
              <strong>Spread the Word!</strong>
              <ClassicLink>Tell your friends about Discogs</ClassicLink>.
            </div>
          </div>

          {message && <p className="search-feedback" role="status">{message}</p>}

          {["Browse Record Labels:", "Browse Artists:"].map((title) => (
            <section className="directory-section" key={title}>
              <h2>{title}</h2>
              <div className="alphabet">
                {letters.map((letter) => <a className="letter-link" href="#" key={`${title}-${letter}`}>{letter}</a>)}
              </div>
            </section>
          ))}

          <section className="list-section">
            <h2>Latest Additions:</h2>
            <ul className="classic-list">
              {additions.map(([artist, release, label]) => (
                <li key={`${artist}-${release}`}><ClassicLink>{artist}</ClassicLink> - "<ClassicLink>{release}</ClassicLink>" (<ClassicLink>{label}</ClassicLink>)</li>
              ))}
            </ul>
            <a className="classic-link more-link" href="#">more...</a>
          </section>

          <section className="list-section">
            <h2>Latest Comments &amp; Reviews:</h2>
            <ul className="classic-list">
              {comments.map(([title, user, comment]) => (
                <li key={title}>
                  <ClassicLink>{title}</ClassicLink> - <ClassicLink>{user}</ClassicLink> - Nov 29, 2001
                  <p className="mb-1 mt-0.5 text-[11px]">{comment}</p>
                </li>
              ))}
            </ul>
            <a className="classic-link more-link" href="#">more...</a>
          </section>
        </section>
      </main>

      <footer className="classic-footer">
        <div><ClassicLink>About Discogs</ClassicLink> | <ClassicLink>Contact Us</ClassicLink> | <ClassicLink>Privacy Statement</ClassicLink></div>
        <div>Copyright © 2001 Zink Media Inc. All Rights Reserved.</div>
      </footer>
    </div>
  );
}