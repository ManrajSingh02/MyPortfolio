export const portfolioQuery = `{
  "profile": *[_type == "profile"][0]{
    name,
    profession,
    "photo": photo.asset->{url},
    about,
    email,
    phone,
    location,
    "resumePdf": resumePdf.asset->{url}
  },
  "projects": *[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    "slug": slug.current,
    description,
    "image": image.asset->{url},
    technologies,
    github,
    liveDemo,
    featured,
    _createdAt
  },
  "skills": *[_type == "skill"]{
    _id,
    skillName,
    category,
    percentage,
    icon,
    color
  },
  "certificates": *[_type == "certificate"] | order(issueDate desc){
    _id,
    title,
    organization,
    issueDate,
    "certificateImage": certificateImage.asset->{url},
    "certificatePdf": certificatePdf.asset->{url},
    credentialLink
  },
  "education": *[_type == "education"] | order(startYear desc){
    _id,
    college,
    degree,
    university,
    startYear,
    endYear,
    cgpa
  },
  "experience": *[_type == "experience"]{
    _id,
    company,
    role,
    description,
    duration,
    technologies
  },
  "social": *[_type == "social"][0]{
    github,
    linkedIn,
    leetCode,
    hackerRank,
    email,
    portfolio
  },
  "resume": *[_type == "resume"][0]{
    "resumePdf": resumePdf.asset->{url}
  }
}`;
