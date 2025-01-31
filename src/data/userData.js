import { faker } from "@faker-js/faker";

export const newPass = faker.internet.password({ length : 8});

export const newComment = faker.lorem.text();