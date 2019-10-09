"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("../../../../../shared/infra/http/models/BaseController");
const postDetailsMap_1 = require("../../../mappers/postDetailsMap");
class GetPopularPostsController extends BaseController_1.BaseController {
    constructor(useCase) {
        super();
        this.useCase = useCase;
    }
    async executeImpl() {
        const dto = {
            offset: this.req.query.offset
        };
        try {
            const result = await this.useCase.execute(dto);
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    default:
                        return this.fail(error.errorValue().message);
                }
            }
            else {
                const postDetails = result.value.getValue();
                return this.ok(this.res, {
                    posts: postDetails.map((d) => postDetailsMap_1.PostDetailsMap.toDTO(d))
                });
            }
        }
        catch (err) {
            return this.fail(err);
        }
    }
}
exports.GetPopularPostsController = GetPopularPostsController;
//# sourceMappingURL=GetPopularPostsController.js.map