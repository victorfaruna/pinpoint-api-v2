"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../database");
const schema_1 = require("../database/schema");
let PostService = class PostService {
    async getAllPost() {
        try {
            const posts = await database_1.default
                .select()
                .from(schema_1.postsTable)
                .limit(20)
                .orderBy((0, drizzle_orm_1.desc)(schema_1.postsTable.id));
            if (posts.length === 0) {
                return {
                    message: 'No posts found',
                    posts: [],
                };
            }
            return {
                message: 'Fetched all posts',
                posts,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('A error occured');
        }
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)()
], PostService);
//# sourceMappingURL=post.service.js.map