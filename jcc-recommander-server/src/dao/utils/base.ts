import mongodb, { UpdateOptions } from 'mongodb'
import {
  Model,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
  HydratedDocument,
  ProjectionType,
  ClientSession,
} from 'mongoose'

/** mongoose 基础操作 */
class MongooseDaoBase<P = unknown> {
  /** mongoose model */
  protected _model: Model<P>

  constructor(model: Model<P>) {
    this._model = model
  }
  /* -------------------- 新建 -------------------- */
  /**
   * 新建文档
   * @param props 新建文档的属性
   * @returns 新建的文档
   */
  public create(props: Partial<P>): Promise<HydratedDocument<P>> {
    return this._model.create(props)
  }

  /**
   * 新建多个文档
   * @param props 新建文档属性（数组）
   * @returns 新建结果
   */
  public createMany(props: P[]): Promise<HydratedDocument<P>[]> {
    return this._model.insertMany(props)
  }

  /* -------------------- 查询 -------------------- */
  /**
   * 筛选查找某一个文档
   * @param filter 筛选条件
   * @param projection 映射字段
   * @param options 查询选项
   * @returns 筛选查询后的文档
   */
  public findOne(
    filter: FilterQuery<P>,
    projection?: ProjectionType<P> | null,
    options?: QueryOptions & { session?: ClientSession }
  ): Promise<HydratedDocument<P> | null> {
    return this._model.findOne(filter, projection, options).exec()
  }
  /**
   * 筛选查找多个文档
   * @param filter 筛选条件
   * @param projection 映射字段
   * @param options 查询选项
   * @returns 筛选查询后的文档数组
   */
  public find(
    filter: FilterQuery<P>,
    projection?: ProjectionType<P> | null,
    options?: QueryOptions
  ): Promise<HydratedDocument<P>[]> {
    return this._model.find(filter, projection, options).exec()
  }

  /**
   * 统计文档数量
   * @param filter 筛选条件
   * @returns 文档数量
   */
  public countDocuments<P>(filter: FilterQuery<P>): Promise<number> {
    return this._model.countDocuments(filter).exec()
  }

  /**
   * 去重统计文档中的某字段。
   * @param field 统计字段
   * @param filter 筛选条件
   * @returns 文档中该字段的去重数据
   */
  public distinct(filed: string, filter: FilterQuery<P>): Promise<any[]> {
    return this._model.distinct(filed as string, filter).exec()
  }

  /* -------------------- 查询并更新 -------------------- */
  /**
   * 查询并更新某一个文档，返回更新（前/后，由`options`中的`new`选项确定）结果。
   * 也常用于`判断是否存在，不存在就创建`的情况。
   * @param filter 筛选条件
   * @param update 更新(的)文档
   * @param options 查询选项
   * @returns 更新（前/后）的文档
   */
  public findOneAndUpdate(
    filter: FilterQuery<P>,
    update: UpdateQuery<P>,
    options?: QueryOptions
  ): Promise<HydratedDocument<P> | null> {
    return this._model.findOneAndUpdate(filter, update, options).exec()
  }

  /**
   * 查询并更新多个文档
   * @param filter 筛选条件
   * @param update 更新(的)文档
   * @param options 选项
   * @returns 更新操作结果
   */
  public updateMany(
    filter: FilterQuery<P>,
    update: UpdateQuery<P>,
    options?: UpdateOptions
  ): Promise<mongodb.UpdateResult> {
    return this._model.updateMany(filter, update, options).exec()
  }

  /* -------------------- 查询并删除 -------------------- */
  /**
   * 查询并删除某一个文档
   * @param filter 筛选条件
   * @param options 查询选项
   * @returns 被删除的文档
   */
  public findOneAndDelete(filter: FilterQuery<P>, options?: QueryOptions): Promise<HydratedDocument<P> | null> {
    return this._model.findOneAndDelete(filter, options).exec()
  }

  /**
   * 查询并删除多个文档
   * @param filter 筛选条件
   * @returns 删除操作结果
   */
  public deleteMany<P>(filter: FilterQuery<P>): Promise<mongodb.DeleteResult> {
    return this._model.deleteMany(filter).exec()
  }
}

export default MongooseDaoBase
