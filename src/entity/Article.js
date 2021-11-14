import { EntitySchema } from 'typeorm';

module.exports = new EntitySchema({
  name: "Article",
  tableName: "articles",
  columns: {
    id: {
      primary: true,
      type: "int",
      unique: true,
      nullable:false
    },
    sourceId: {
      type: "varchar",
      nullable: true
    },
    sourceName: {
      type: "varchar",
      nullable: true
    },
    author: {
      type: "varchar",
      nullable: true
    },
    title: {
      type: "varchar",
      nullable: true
    },
    description: {
      type: "varchar",
      nullable: true
    },
    url: {
      type: "varchar",
      nullable: true
    },
    imageUrl: {
      type: "varchar",
      nullable: true
    },
    publishedAt: {
      type: "timestamptz",
      nullable: true
    },
    content: {
      type: "text",
      nullable: true
    }
  },
});

