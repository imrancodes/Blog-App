import { Client, Databases, Storage, Query, ID } from 'appwrite';
import conf from '../conf/conf';

export class Service {
    client = new Client()
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)

    }

    async createPost({ title, content, featureImg, status, userId, slug }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImg,
                    userId,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite :: createPost ::', error);
        }
    }

    async updatePost(slug, { title, content, featureImg, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImg,
                    status
                }
            )
        } catch (error) {
            console.log('Appwrite :: updatePost ::', error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('Appwrite :: deleteDocument ::', error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteUrl,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            console.log('Appwrite :: getPost ::', error);
            return false
        }
    }

    async getPosts(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal('status', 'active')
                ]
            )
        } catch (error) {
            console.log('Appwrite :: getPosts ::', error);
            return false
        }
    }

    // file upload

    async uploadFile(file){
        try {
            return await this.storage.createFile(
               conf.appwriteBucketId,
               ID.unique(),
               file
            )
        } catch (error) {
            console.log('Appwrite :: uploadFile ::', error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.storage.deleteFile(
               conf.appwriteBucketId,
               fileId
            )
        } catch (error) {
            console.log('Appwrite :: deleteFile ::', error);
            return false
        }
    }

    getFilePreview(fileId){
        try {
            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log('Appwrite :: deleteFile ::', error);
            return false
        }
    }
}

const service = new Service()

export default service