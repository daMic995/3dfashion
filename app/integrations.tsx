class Apps {
    name: string = '';
    description: string = '';
    image: string = '';
    link: string = '';
}

const integrations: Apps[] = [
    {
        name: 'Blender',
        description: 'Blender is a free, open-source 3D computer graphics software that can be used to create a variety of 3D content',
        image: '/integrations/blender.png',
        link: 'https://www.blender.org/'
    },
    {
        name: 'Google Drive',
        description: 'Google Drive is a cloud storage service that allows users to store and access files',
        image: '/integrations/google_drive.png',
        link: 'https://workspace.google.com/products/drive/'
    },

    {
        name: "Macy's",
        description: "Macy's is a department store chain that offers a variety of products, including clothing, accessories, and home goods",
        image: '/integrations/macys.png',
        link: 'https://www.macys.com/'
    },

    {
        name: 'GroupDocs',
        description: 'GroupDocs is a document automation API provider that offers a variety of tools for managing and manipulating documents',
        image: '/integrations/groupdocs.png',
        link: 'https://products.groupdocs.app/'
    }
];
export default integrations;