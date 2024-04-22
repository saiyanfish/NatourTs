"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tourModel_1 = __importDefault(require("../model/tourModel"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const appError_1 = __importDefault(require("../utils/appError"));
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const tourController = {
    getTour: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let query = tourModel_1.default.find();
        let queryObj = Object.assign({}, req.query);
        const queryRs = new apiFeatures_1.default(query, queryObj)
            .filter()
            .limitFields()
            .sort()
            .page();
        const tours = yield queryRs.query;
        console.log(tours);
        if (!tours || tours.length === 0) {
            return next(new appError_1.default('no tours can find', 404));
        }
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    })),
    getSingleTour: (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const tour = yield tourModel_1.default.findById(req.params.id);
        if (!tour)
            return next(new appError_1.default('GG', 404));
        res.status(200).json({
            status: 'success',
            data: tour,
        });
    })),
};
exports.default = tourController;
