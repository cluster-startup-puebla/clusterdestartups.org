export const COMMITTEE_SLUGS = [
  "mesa-directiva",
  "vigilancia",
  "vinculacion",
  "honorarios",
] as const;

export type CommitteeSlug = (typeof COMMITTEE_SLUGS)[number];

export type CommitteeKind = "board" | "committee" | "honorary";

export type CommitteeMember = {
  name: string;
  roleKey: string;
  descriptionKey?: string;
  photo?: string;
  photoClassName?: string;
  href?: string;
};

export type Committee = {
  slug: CommitteeSlug;
  kind: CommitteeKind;
  titleKey: string;
  whatKey: string;
  purposeKey: string;
  metaTitleKey: string;
  metaDescriptionKey: string;
  ctaKey: string;
  lead?: CommitteeMember;
  members: readonly CommitteeMember[];
};

export const committees: readonly Committee[] = [
  {
    slug: "mesa-directiva",
    kind: "board",
    titleKey: "boardTitle",
    whatKey: "boardWhat",
    purposeKey: "boardPurpose",
    metaTitleKey: "boardMetaTitle",
    metaDescriptionKey: "boardMetaDescription",
    ctaKey: "openBoard",
    lead: {
      name: "Yamil Álvarez",
      roleKey: "boardYamilRole",
      descriptionKey: "boardYamilDescription",
      photo: "/fundadores/yamil-alvarez.webp",
      href: "/fundadores/yamil-alvarez",
    },
    members: [
      {
        name: "Daniel Martínez",
        roleKey: "boardDanielRole",
        descriptionKey: "boardDanielDescription",
        photo: "/fundadores/daniel-martinez.webp",
        href: "/fundadores/daniel-martinez",
      },
      {
        name: "Álvaro Castillo",
        roleKey: "boardAlvaroRole",
        descriptionKey: "boardAlvaroDescription",
        photo: "/fundadores/alvaro-castillo.webp",
        href: "/fundadores/alvaro-castillo",
      },
      {
        name: "Rodrigo Ruiz",
        roleKey: "boardRodrigoRole",
        descriptionKey: "boardRodrigoDescription",
        photo: "/fundadores/rodrigo-ruiz.webp",
        href: "/fundadores/rodrigo-ruiz",
      },
    ],
  },
  {
    slug: "vigilancia",
    kind: "committee",
    titleKey: "vigilanciaTitle",
    whatKey: "vigilanciaWhat",
    purposeKey: "vigilanciaPurpose",
    metaTitleKey: "vigilanciaMetaTitle",
    metaDescriptionKey: "vigilanciaMetaDescription",
    ctaKey: "openCommittee",
    members: [
      {
        name: "Oliver Sahlmann",
        roleKey: "vigilanciaOliverRole",
        photo: "/gobernanza/oliver-sahlmann.png",
        photoClassName: "object-top",
      },
      {
        name: "Héctor Gama",
        roleKey: "vigilanciaHectorRole",
        photo: "/gobernanza/gobernanza-hector-gama.png",
        photoClassName: "object-top",
      },
    ],
  },
  {
    slug: "vinculacion",
    kind: "committee",
    titleKey: "communityTitle",
    whatKey: "communityWhat",
    purposeKey: "communityPurpose",
    metaTitleKey: "communityMetaTitle",
    metaDescriptionKey: "communityMetaDescription",
    ctaKey: "openCommittee",
    members: [
      {
        name: "Fátima Gaytán",
        roleKey: "communityFatimaRole",
        photo: "/fundadores/fatima-gaytan.webp",
        href: "/fundadores/fatima-gaytan",
      },
    ],
  },
  {
    slug: "honorarios",
    kind: "honorary",
    titleKey: "honoraryTitle",
    whatKey: "honoraryWhat",
    purposeKey: "honoraryPurpose",
    metaTitleKey: "honoraryMetaTitle",
    metaDescriptionKey: "honoraryMetaDescription",
    ctaKey: "openHonorary",
    members: [
      {
        name: "Pablo Nuño",
        roleKey: "honoraryPabloRole",
        photo: "/gobernanza/pablo-nuno.webp",
        photoClassName: "object-top",
      },
    ],
  },
];

export function getCommittee(slug: string): Committee | undefined {
  return committees.find((committee) => committee.slug === slug);
}

export function committeePeople(committee: Committee): CommitteeMember[] {
  return committee.lead ? [committee.lead, ...committee.members] : [...committee.members];
}
