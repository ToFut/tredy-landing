import Link from "next/link";
import { WhatsAppThread } from "@/components/visuals/Screens";
import { industryStories } from "@/lib/industry-stories";

export function IndustryStory({ path }: { path: string }) {
  const story = industryStories[path];
  if (!story) return null;
  return (
    <>
      <section className="band">
        <div className="wrap">
          <h2 className="type-h2">The calls that get missed</h2>
          <ul className="plain-list">
            {story.problems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="band">
        <div className="wrap grid-12">
          <div className="span-6">
            <h2 className="type-h2">A sample call</h2>
            <ol className="script-list">
              {story.script.map((line) => (
                <li key={line.text}>
                  <strong>{line.speaker}</strong>
                  {line.text}
                </li>
              ))}
            </ol>
            <p className="type-small">Fictional example. Not a recording of a real customer.</p>
          </div>
          <div className="span-6">
            <h2 className="type-h2">What the office gets</h2>
            <WhatsAppThread name={story.summaryName} messages={story.summary} />
          </div>
        </div>
      </section>
      <section className="band">
        <div className="wrap">
          <h2 className="type-h2">Tools it can connect to</h2>
          <p className="type-body">
            The receptionist can connect to {story.tools.join(", ")}. Connecting is optional. Your current system can stay.
          </p>
          <p className="card-price">
            <Link href="/pricing">From $1,495 setup and $349/mo</Link>
          </p>
        </div>
      </section>
    </>
  );
}
