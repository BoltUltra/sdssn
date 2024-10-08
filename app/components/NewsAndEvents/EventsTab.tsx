import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { eventsm, news } from "@/public/images";
import Image from "next/image";

const EventsTab = () => {
  const categories = [
    {
      name: "News",
      posts: [
        {
          id: 5,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "1 day ago",
          commentCount: 12,
          shareCount: 4,
          image: news,
        },
        {
          id: 6,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "2 days ago",
          commentCount: 8,
          shareCount: 2,
          image: news,
        },
        {
          id: 7,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "3 days ago",
          commentCount: 5,
          shareCount: 1,
          image: news,
        },
        {
          id: 8,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "4 days ago",
          commentCount: 3,
          shareCount: 0,
          image: news,
        },
      ],
    },
    {
      name: "Events",
      posts: [
        {
          id: 5,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "1 day ago",
          commentCount: 12,
          shareCount: 4,
          image: eventsm,
        },
        {
          id: 6,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "2 days ago",
          commentCount: 8,
          shareCount: 2,
          image: eventsm,
        },
        {
          id: 7,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "3 days ago",
          commentCount: 5,
          shareCount: 1,
          image: eventsm,
        },
        {
          id: 8,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "4 days ago",
          commentCount: 3,
          shareCount: 0,
          image: eventsm,
        },
      ],
    },
    {
      name: "SDSSN Webinars",
      posts: [
        {
          id: 5,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "1 day ago",
          commentCount: 12,
          shareCount: 4,
          image: eventsm,
        },
        {
          id: 6,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "2 days ago",
          commentCount: 8,
          shareCount: 2,
          image: eventsm,
        },
        {
          id: 7,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "3 days ago",
          commentCount: 5,
          shareCount: 1,
          image: eventsm,
        },
        {
          id: 8,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "4 days ago",
          commentCount: 3,
          shareCount: 0,
          image: eventsm,
        },
      ],
    },
    {
      name: "Cohorts of Volunteers",
      posts: [
        {
          id: 5,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "1 day ago",
          commentCount: 12,
          shareCount: 4,
          image: eventsm,
        },
        {
          id: 6,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "2 days ago",
          commentCount: 8,
          shareCount: 2,
          image: eventsm,
        },
        {
          id: 7,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "3 days ago",
          commentCount: 5,
          shareCount: 1,
          image: eventsm,
        },
        {
          id: 8,
          title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate a animi ad deserunt eligendi vel nihil ex odit illo et! Dolor nostrum quaerat, rem doloremque ad quasi cumque! Aut, corporis? Sint, neque eum doloremque quidem quis odit, ab, repudiandae perspiciatis maxime harum explicabo nam repellendus in amet praesentium saepe itaque distinctio ut ipsa nobis. Nesciunt blanditiis repudiandae modi sed dolorum! Commodi cupiditate accusamus vero eligendi esse nulla ex impedit non ducimus quo, nostrum iste officia facilis laboriosam possimus incidunt. Earum cumque quaerat iusto unde deserunt atque rerum, consequuntur dolore nostrum. Natus quia voluptatum provident minus quibusdam, deleniti aliquid, error eveniet nam eligendi voluptate ipsam ad placeat doloribus quod repellendus nemo reprehenderit molestiae nulla perferendis! Nostrum, perferendis. Nulla officia omnis vitae.",
          date: "4 days ago",
          commentCount: 3,
          shareCount: 0,
          image: eventsm,
        },
      ],
    },
  ];
  return (
    <section>
      <div className="section-container">
        <TabGroup>
          <TabList className="flex gap-10">
            {categories.map(({ name }) => (
              <Tab
                key={name}
                className="font-semibold text-lg focus:outline-none border-b-2 border-b-transparent data-[selected]:border-b-black data-[hover]:border-b-2 data-[selected]:data-[hover]:border-b-2"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3">
            {categories.map(({ name, posts }) => (
              <TabPanel key={name} className="grid md:grid-cols-2 gap-10">
                <div
                  key={posts[0].id}
                  className="relative rounded-md p-3 transition md:block hidden"
                >
                  <Image src={posts[0].image} alt="" />
                  <div className="flex flex-col mt-6 space-y-4">
                    <a href="#" className="text-2xl">
                      <span className="absolute inset-0" />
                      {posts[0].title}
                    </a>
                    <p>{posts[0].content.substring(0, 200)}...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {posts.map((post) => (
                    <div
                      key={post.id}
                      className="relative rounded-md p-3 font-light text-lg flex items-start space-x-5 hover:bg-slate-100 transition-all duration-500 ease-in-out hover:scale-105"
                    >
                      <Image src={post.image} alt="" height={200} width={200} />
                      <a href="#" className="">
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </div>
                  ))}
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </section>
  );
};

export default EventsTab;
