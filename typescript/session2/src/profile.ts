interface Profile {
  displayName: string;
  bio?: string;
  website?: string;
  avatarUrl?: string;
}

function renderProfile(profile: Profile): string {
  let output = `Name: ${profile.displayName}\n`;
  output += `Bio: ${profile.bio ?? "No bio provided"}\n`;
  if (profile.website) {
    output += `Website: ${profile.website}`;
  }

  return output;
}


const profile1: Profile = {
  displayName: "Benny",
  bio: "MERN and AI Developer",
  website: "https://benny.dev",
  avatarUrl: "avatar.png",
};

console.log(renderProfile(profile1));

const profile2: Profile = {
  displayName: "Jacob",
};

console.log(renderProfile(profile2));

/*
If we write profile.bio.toUpperCase(), TypeScript gives an error because 
bio is optional and might not exist in every profile. If bio is undefined,
calling toUpperCase() on it would cause a runtime error, so we need to check 
if bio exists before using it.
*/