type Project = {
  title: string;
  description: string;
  href?: string;
  imgSrc?: string;
};

// TODO: Add projects later
const projectsData: Project[] = [
  {
    title: 'Sample Project 1',
    description: 'A sample project to demonstrate the structure',
    href: '#',
    imgSrc: '/static/images/logo.png',
  },
  {
    title: 'Sample Project 2',
    description: 'Another sample project',
    href: '#',
  },
];

export default projectsData;
