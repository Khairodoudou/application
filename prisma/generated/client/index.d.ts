
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model DoctorProfile
 * 
 */
export type DoctorProfile = $Result.DefaultSelection<Prisma.$DoctorProfilePayload>
/**
 * Model HealthProfile
 * 
 */
export type HealthProfile = $Result.DefaultSelection<Prisma.$HealthProfilePayload>
/**
 * Model DoctorPatient
 * 
 */
export type DoctorPatient = $Result.DefaultSelection<Prisma.$DoctorPatientPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model FoodScan
 * 
 */
export type FoodScan = $Result.DefaultSelection<Prisma.$FoodScanPayload>
/**
 * Model Report
 * 
 */
export type Report = $Result.DefaultSelection<Prisma.$ReportPayload>
/**
 * Model Notification
 * 
 */
export type Notification = $Result.DefaultSelection<Prisma.$NotificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  ADMIN: 'ADMIN',
  DOCTOR: 'DOCTOR',
  PATIENT: 'PATIENT'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const SubscriptionStatus: {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  SUSPENDED: 'SUSPENDED',
  CANCELLED: 'CANCELLED'
};

export type SubscriptionStatus = (typeof SubscriptionStatus)[keyof typeof SubscriptionStatus]


export const AppointmentStatus: {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]


export const FoodScanResult: {
  SAFE: 'SAFE',
  WARNING: 'WARNING',
  UNSAFE: 'UNSAFE'
};

export type FoodScanResult = (typeof FoodScanResult)[keyof typeof FoodScanResult]


export const ReportStatus: {
  PENDING: 'PENDING',
  REVIEWED: 'REVIEWED',
  RESOLVED: 'RESOLVED'
};

export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type SubscriptionStatus = $Enums.SubscriptionStatus

export const SubscriptionStatus: typeof $Enums.SubscriptionStatus

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

export type FoodScanResult = $Enums.FoodScanResult

export const FoodScanResult: typeof $Enums.FoodScanResult

export type ReportStatus = $Enums.ReportStatus

export const ReportStatus: typeof $Enums.ReportStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorProfile`: Exposes CRUD operations for the **DoctorProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorProfiles
    * const doctorProfiles = await prisma.doctorProfile.findMany()
    * ```
    */
  get doctorProfile(): Prisma.DoctorProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.healthProfile`: Exposes CRUD operations for the **HealthProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HealthProfiles
    * const healthProfiles = await prisma.healthProfile.findMany()
    * ```
    */
  get healthProfile(): Prisma.HealthProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.doctorPatient`: Exposes CRUD operations for the **DoctorPatient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DoctorPatients
    * const doctorPatients = await prisma.doctorPatient.findMany()
    * ```
    */
  get doctorPatient(): Prisma.DoctorPatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.foodScan`: Exposes CRUD operations for the **FoodScan** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FoodScans
    * const foodScans = await prisma.foodScan.findMany()
    * ```
    */
  get foodScan(): Prisma.FoodScanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notifications
    * const notifications = await prisma.notification.findMany()
    * ```
    */
  get notification(): Prisma.NotificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    DoctorProfile: 'DoctorProfile',
    HealthProfile: 'HealthProfile',
    DoctorPatient: 'DoctorPatient',
    Appointment: 'Appointment',
    Message: 'Message',
    FoodScan: 'FoodScan',
    Report: 'Report',
    Notification: 'Notification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "doctorProfile" | "healthProfile" | "doctorPatient" | "appointment" | "message" | "foodScan" | "report" | "notification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      DoctorProfile: {
        payload: Prisma.$DoctorProfilePayload<ExtArgs>
        fields: Prisma.DoctorProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>
          }
          findFirst: {
            args: Prisma.DoctorProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>
          }
          findMany: {
            args: Prisma.DoctorProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>[]
          }
          create: {
            args: Prisma.DoctorProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>
          }
          createMany: {
            args: Prisma.DoctorProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>[]
          }
          delete: {
            args: Prisma.DoctorProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>
          }
          update: {
            args: Prisma.DoctorProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>
          }
          deleteMany: {
            args: Prisma.DoctorProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>[]
          }
          upsert: {
            args: Prisma.DoctorProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorProfilePayload>
          }
          aggregate: {
            args: Prisma.DoctorProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorProfile>
          }
          groupBy: {
            args: Prisma.DoctorProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorProfileCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorProfileCountAggregateOutputType> | number
          }
        }
      }
      HealthProfile: {
        payload: Prisma.$HealthProfilePayload<ExtArgs>
        fields: Prisma.HealthProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HealthProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HealthProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          findFirst: {
            args: Prisma.HealthProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HealthProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          findMany: {
            args: Prisma.HealthProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>[]
          }
          create: {
            args: Prisma.HealthProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          createMany: {
            args: Prisma.HealthProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HealthProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>[]
          }
          delete: {
            args: Prisma.HealthProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          update: {
            args: Prisma.HealthProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          deleteMany: {
            args: Prisma.HealthProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HealthProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HealthProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>[]
          }
          upsert: {
            args: Prisma.HealthProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HealthProfilePayload>
          }
          aggregate: {
            args: Prisma.HealthProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHealthProfile>
          }
          groupBy: {
            args: Prisma.HealthProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<HealthProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.HealthProfileCountArgs<ExtArgs>
            result: $Utils.Optional<HealthProfileCountAggregateOutputType> | number
          }
        }
      }
      DoctorPatient: {
        payload: Prisma.$DoctorPatientPayload<ExtArgs>
        fields: Prisma.DoctorPatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DoctorPatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DoctorPatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>
          }
          findFirst: {
            args: Prisma.DoctorPatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DoctorPatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>
          }
          findMany: {
            args: Prisma.DoctorPatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>[]
          }
          create: {
            args: Prisma.DoctorPatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>
          }
          createMany: {
            args: Prisma.DoctorPatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DoctorPatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>[]
          }
          delete: {
            args: Prisma.DoctorPatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>
          }
          update: {
            args: Prisma.DoctorPatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>
          }
          deleteMany: {
            args: Prisma.DoctorPatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DoctorPatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DoctorPatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>[]
          }
          upsert: {
            args: Prisma.DoctorPatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DoctorPatientPayload>
          }
          aggregate: {
            args: Prisma.DoctorPatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDoctorPatient>
          }
          groupBy: {
            args: Prisma.DoctorPatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<DoctorPatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.DoctorPatientCountArgs<ExtArgs>
            result: $Utils.Optional<DoctorPatientCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppointmentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AppointmentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      FoodScan: {
        payload: Prisma.$FoodScanPayload<ExtArgs>
        fields: Prisma.FoodScanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FoodScanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FoodScanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>
          }
          findFirst: {
            args: Prisma.FoodScanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FoodScanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>
          }
          findMany: {
            args: Prisma.FoodScanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>[]
          }
          create: {
            args: Prisma.FoodScanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>
          }
          createMany: {
            args: Prisma.FoodScanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FoodScanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>[]
          }
          delete: {
            args: Prisma.FoodScanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>
          }
          update: {
            args: Prisma.FoodScanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>
          }
          deleteMany: {
            args: Prisma.FoodScanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FoodScanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FoodScanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>[]
          }
          upsert: {
            args: Prisma.FoodScanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FoodScanPayload>
          }
          aggregate: {
            args: Prisma.FoodScanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFoodScan>
          }
          groupBy: {
            args: Prisma.FoodScanGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoodScanGroupByOutputType>[]
          }
          count: {
            args: Prisma.FoodScanCountArgs<ExtArgs>
            result: $Utils.Optional<FoodScanCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: Prisma.$ReportPayload<ExtArgs>
        fields: Prisma.ReportFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReportCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReportUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>[]
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReportCountArgs<ExtArgs>
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      Notification: {
        payload: Prisma.$NotificationPayload<ExtArgs>
        fields: Prisma.NotificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NotificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findFirst: {
            args: Prisma.NotificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          findMany: {
            args: Prisma.NotificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          create: {
            args: Prisma.NotificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          createMany: {
            args: Prisma.NotificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          delete: {
            args: Prisma.NotificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          update: {
            args: Prisma.NotificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          deleteMany: {
            args: Prisma.NotificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NotificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>[]
          }
          upsert: {
            args: Prisma.NotificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NotificationPayload>
          }
          aggregate: {
            args: Prisma.NotificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotification>
          }
          groupBy: {
            args: Prisma.NotificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.NotificationCountArgs<ExtArgs>
            result: $Utils.Optional<NotificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    doctorProfile?: DoctorProfileOmit
    healthProfile?: HealthProfileOmit
    doctorPatient?: DoctorPatientOmit
    appointment?: AppointmentOmit
    message?: MessageOmit
    foodScan?: FoodScanOmit
    report?: ReportOmit
    notification?: NotificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sentMessages: number
    receivedMessages: number
    foodScans: number
    reports: number
    doctorAppointments: number
    patientAppointments: number
    doctorPatients: number
    patientDoctors: number
    notifications: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sentMessages?: boolean | UserCountOutputTypeCountSentMessagesArgs
    receivedMessages?: boolean | UserCountOutputTypeCountReceivedMessagesArgs
    foodScans?: boolean | UserCountOutputTypeCountFoodScansArgs
    reports?: boolean | UserCountOutputTypeCountReportsArgs
    doctorAppointments?: boolean | UserCountOutputTypeCountDoctorAppointmentsArgs
    patientAppointments?: boolean | UserCountOutputTypeCountPatientAppointmentsArgs
    doctorPatients?: boolean | UserCountOutputTypeCountDoctorPatientsArgs
    patientDoctors?: boolean | UserCountOutputTypeCountPatientDoctorsArgs
    notifications?: boolean | UserCountOutputTypeCountNotificationsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFoodScansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodScanWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDoctorAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPatientAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDoctorPatientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorPatientWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPatientDoctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorPatientWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    role: $Enums.UserRole | null
    firstName: string | null
    lastName: string | null
    phone: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    role: number
    firstName: number
    lastName: number
    phone: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    role?: true
    firstName?: true
    lastName?: true
    phone?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone: string | null
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctorProfile?: boolean | User$doctorProfileArgs<ExtArgs>
    healthProfile?: boolean | User$healthProfileArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    foodScans?: boolean | User$foodScansArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    doctorAppointments?: boolean | User$doctorAppointmentsArgs<ExtArgs>
    patientAppointments?: boolean | User$patientAppointmentsArgs<ExtArgs>
    doctorPatients?: boolean | User$doctorPatientsArgs<ExtArgs>
    patientDoctors?: boolean | User$patientDoctorsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    firstName?: boolean
    lastName?: boolean
    phone?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "role" | "firstName" | "lastName" | "phone" | "avatar" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctorProfile?: boolean | User$doctorProfileArgs<ExtArgs>
    healthProfile?: boolean | User$healthProfileArgs<ExtArgs>
    sentMessages?: boolean | User$sentMessagesArgs<ExtArgs>
    receivedMessages?: boolean | User$receivedMessagesArgs<ExtArgs>
    foodScans?: boolean | User$foodScansArgs<ExtArgs>
    reports?: boolean | User$reportsArgs<ExtArgs>
    doctorAppointments?: boolean | User$doctorAppointmentsArgs<ExtArgs>
    patientAppointments?: boolean | User$patientAppointmentsArgs<ExtArgs>
    doctorPatients?: boolean | User$doctorPatientsArgs<ExtArgs>
    patientDoctors?: boolean | User$patientDoctorsArgs<ExtArgs>
    notifications?: boolean | User$notificationsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      doctorProfile: Prisma.$DoctorProfilePayload<ExtArgs> | null
      healthProfile: Prisma.$HealthProfilePayload<ExtArgs> | null
      sentMessages: Prisma.$MessagePayload<ExtArgs>[]
      receivedMessages: Prisma.$MessagePayload<ExtArgs>[]
      foodScans: Prisma.$FoodScanPayload<ExtArgs>[]
      reports: Prisma.$ReportPayload<ExtArgs>[]
      doctorAppointments: Prisma.$AppointmentPayload<ExtArgs>[]
      patientAppointments: Prisma.$AppointmentPayload<ExtArgs>[]
      doctorPatients: Prisma.$DoctorPatientPayload<ExtArgs>[]
      patientDoctors: Prisma.$DoctorPatientPayload<ExtArgs>[]
      notifications: Prisma.$NotificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      role: $Enums.UserRole
      firstName: string
      lastName: string
      phone: string | null
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctorProfile<T extends User$doctorProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorProfileArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    healthProfile<T extends User$healthProfileArgs<ExtArgs> = {}>(args?: Subset<T, User$healthProfileArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sentMessages<T extends User$sentMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$sentMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedMessages<T extends User$receivedMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    foodScans<T extends User$foodScansArgs<ExtArgs> = {}>(args?: Subset<T, User$foodScansArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reports<T extends User$reportsArgs<ExtArgs> = {}>(args?: Subset<T, User$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doctorAppointments<T extends User$doctorAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    patientAppointments<T extends User$patientAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, User$patientAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    doctorPatients<T extends User$doctorPatientsArgs<ExtArgs> = {}>(args?: Subset<T, User$doctorPatientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    patientDoctors<T extends User$patientDoctorsArgs<ExtArgs> = {}>(args?: Subset<T, User$patientDoctorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notifications<T extends User$notificationsArgs<ExtArgs> = {}>(args?: Subset<T, User$notificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.doctorProfile
   */
  export type User$doctorProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    where?: DoctorProfileWhereInput
  }

  /**
   * User.healthProfile
   */
  export type User$healthProfileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    where?: HealthProfileWhereInput
  }

  /**
   * User.sentMessages
   */
  export type User$sentMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.receivedMessages
   */
  export type User$receivedMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * User.foodScans
   */
  export type User$foodScansArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    where?: FoodScanWhereInput
    orderBy?: FoodScanOrderByWithRelationInput | FoodScanOrderByWithRelationInput[]
    cursor?: FoodScanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoodScanScalarFieldEnum | FoodScanScalarFieldEnum[]
  }

  /**
   * User.reports
   */
  export type User$reportsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * User.doctorAppointments
   */
  export type User$doctorAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.patientAppointments
   */
  export type User$patientAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * User.doctorPatients
   */
  export type User$doctorPatientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    where?: DoctorPatientWhereInput
    orderBy?: DoctorPatientOrderByWithRelationInput | DoctorPatientOrderByWithRelationInput[]
    cursor?: DoctorPatientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorPatientScalarFieldEnum | DoctorPatientScalarFieldEnum[]
  }

  /**
   * User.patientDoctors
   */
  export type User$patientDoctorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    where?: DoctorPatientWhereInput
    orderBy?: DoctorPatientOrderByWithRelationInput | DoctorPatientOrderByWithRelationInput[]
    cursor?: DoctorPatientWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DoctorPatientScalarFieldEnum | DoctorPatientScalarFieldEnum[]
  }

  /**
   * User.notifications
   */
  export type User$notificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    cursor?: NotificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model DoctorProfile
   */

  export type AggregateDoctorProfile = {
    _count: DoctorProfileCountAggregateOutputType | null
    _avg: DoctorProfileAvgAggregateOutputType | null
    _sum: DoctorProfileSumAggregateOutputType | null
    _min: DoctorProfileMinAggregateOutputType | null
    _max: DoctorProfileMaxAggregateOutputType | null
  }

  export type DoctorProfileAvgAggregateOutputType = {
    consultationFee: number | null
    yearsOfExperience: number | null
    latitude: number | null
    longitude: number | null
  }

  export type DoctorProfileSumAggregateOutputType = {
    consultationFee: number | null
    yearsOfExperience: number | null
    latitude: number | null
    longitude: number | null
  }

  export type DoctorProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    specialty: string | null
    licenseNumber: string | null
    clinicAddress: string | null
    bio: string | null
    consultationFee: number | null
    gender: string | null
    yearsOfExperience: number | null
    spokenLanguages: string | null
    city: string | null
    country: string | null
    consultationMode: string | null
    linkedin: string | null
    whatsapp: string | null
    telegram: string | null
    googleMapsLink: string | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    subscriptionStart: Date | null
    subscriptionEnd: Date | null
    availability: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    specialty: string | null
    licenseNumber: string | null
    clinicAddress: string | null
    bio: string | null
    consultationFee: number | null
    gender: string | null
    yearsOfExperience: number | null
    spokenLanguages: string | null
    city: string | null
    country: string | null
    consultationMode: string | null
    linkedin: string | null
    whatsapp: string | null
    telegram: string | null
    googleMapsLink: string | null
    subscriptionStatus: $Enums.SubscriptionStatus | null
    subscriptionStart: Date | null
    subscriptionEnd: Date | null
    availability: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorProfileCountAggregateOutputType = {
    id: number
    userId: number
    specialty: number
    licenseNumber: number
    clinicAddress: number
    bio: number
    consultationFee: number
    gender: number
    yearsOfExperience: number
    spokenLanguages: number
    city: number
    country: number
    consultationMode: number
    linkedin: number
    whatsapp: number
    telegram: number
    googleMapsLink: number
    subscriptionStatus: number
    subscriptionStart: number
    subscriptionEnd: number
    availability: number
    latitude: number
    longitude: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DoctorProfileAvgAggregateInputType = {
    consultationFee?: true
    yearsOfExperience?: true
    latitude?: true
    longitude?: true
  }

  export type DoctorProfileSumAggregateInputType = {
    consultationFee?: true
    yearsOfExperience?: true
    latitude?: true
    longitude?: true
  }

  export type DoctorProfileMinAggregateInputType = {
    id?: true
    userId?: true
    specialty?: true
    licenseNumber?: true
    clinicAddress?: true
    bio?: true
    consultationFee?: true
    gender?: true
    yearsOfExperience?: true
    spokenLanguages?: true
    city?: true
    country?: true
    consultationMode?: true
    linkedin?: true
    whatsapp?: true
    telegram?: true
    googleMapsLink?: true
    subscriptionStatus?: true
    subscriptionStart?: true
    subscriptionEnd?: true
    availability?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    specialty?: true
    licenseNumber?: true
    clinicAddress?: true
    bio?: true
    consultationFee?: true
    gender?: true
    yearsOfExperience?: true
    spokenLanguages?: true
    city?: true
    country?: true
    consultationMode?: true
    linkedin?: true
    whatsapp?: true
    telegram?: true
    googleMapsLink?: true
    subscriptionStatus?: true
    subscriptionStart?: true
    subscriptionEnd?: true
    availability?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorProfileCountAggregateInputType = {
    id?: true
    userId?: true
    specialty?: true
    licenseNumber?: true
    clinicAddress?: true
    bio?: true
    consultationFee?: true
    gender?: true
    yearsOfExperience?: true
    spokenLanguages?: true
    city?: true
    country?: true
    consultationMode?: true
    linkedin?: true
    whatsapp?: true
    telegram?: true
    googleMapsLink?: true
    subscriptionStatus?: true
    subscriptionStart?: true
    subscriptionEnd?: true
    availability?: true
    latitude?: true
    longitude?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DoctorProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorProfile to aggregate.
     */
    where?: DoctorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: DoctorProfileOrderByWithRelationInput | DoctorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorProfiles
    **/
    _count?: true | DoctorProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorProfileMaxAggregateInputType
  }

  export type GetDoctorProfileAggregateType<T extends DoctorProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorProfile[P]>
      : GetScalarType<T[P], AggregateDoctorProfile[P]>
  }




  export type DoctorProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorProfileWhereInput
    orderBy?: DoctorProfileOrderByWithAggregationInput | DoctorProfileOrderByWithAggregationInput[]
    by: DoctorProfileScalarFieldEnum[] | DoctorProfileScalarFieldEnum
    having?: DoctorProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorProfileCountAggregateInputType | true
    _avg?: DoctorProfileAvgAggregateInputType
    _sum?: DoctorProfileSumAggregateInputType
    _min?: DoctorProfileMinAggregateInputType
    _max?: DoctorProfileMaxAggregateInputType
  }

  export type DoctorProfileGroupByOutputType = {
    id: string
    userId: string
    specialty: string
    licenseNumber: string
    clinicAddress: string
    bio: string | null
    consultationFee: number | null
    gender: string | null
    yearsOfExperience: number | null
    spokenLanguages: string | null
    city: string | null
    country: string | null
    consultationMode: string | null
    linkedin: string | null
    whatsapp: string | null
    telegram: string | null
    googleMapsLink: string | null
    subscriptionStatus: $Enums.SubscriptionStatus
    subscriptionStart: Date | null
    subscriptionEnd: Date | null
    availability: string | null
    latitude: number | null
    longitude: number | null
    createdAt: Date
    updatedAt: Date
    _count: DoctorProfileCountAggregateOutputType | null
    _avg: DoctorProfileAvgAggregateOutputType | null
    _sum: DoctorProfileSumAggregateOutputType | null
    _min: DoctorProfileMinAggregateOutputType | null
    _max: DoctorProfileMaxAggregateOutputType | null
  }

  type GetDoctorProfileGroupByPayload<T extends DoctorProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorProfileGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorProfileGroupByOutputType[P]>
        }
      >
    >


  export type DoctorProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    clinicAddress?: boolean
    bio?: boolean
    consultationFee?: boolean
    gender?: boolean
    yearsOfExperience?: boolean
    spokenLanguages?: boolean
    city?: boolean
    country?: boolean
    consultationMode?: boolean
    linkedin?: boolean
    whatsapp?: boolean
    telegram?: boolean
    googleMapsLink?: boolean
    subscriptionStatus?: boolean
    subscriptionStart?: boolean
    subscriptionEnd?: boolean
    availability?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorProfile"]>

  export type DoctorProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    clinicAddress?: boolean
    bio?: boolean
    consultationFee?: boolean
    gender?: boolean
    yearsOfExperience?: boolean
    spokenLanguages?: boolean
    city?: boolean
    country?: boolean
    consultationMode?: boolean
    linkedin?: boolean
    whatsapp?: boolean
    telegram?: boolean
    googleMapsLink?: boolean
    subscriptionStatus?: boolean
    subscriptionStart?: boolean
    subscriptionEnd?: boolean
    availability?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorProfile"]>

  export type DoctorProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    clinicAddress?: boolean
    bio?: boolean
    consultationFee?: boolean
    gender?: boolean
    yearsOfExperience?: boolean
    spokenLanguages?: boolean
    city?: boolean
    country?: boolean
    consultationMode?: boolean
    linkedin?: boolean
    whatsapp?: boolean
    telegram?: boolean
    googleMapsLink?: boolean
    subscriptionStatus?: boolean
    subscriptionStart?: boolean
    subscriptionEnd?: boolean
    availability?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorProfile"]>

  export type DoctorProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    specialty?: boolean
    licenseNumber?: boolean
    clinicAddress?: boolean
    bio?: boolean
    consultationFee?: boolean
    gender?: boolean
    yearsOfExperience?: boolean
    spokenLanguages?: boolean
    city?: boolean
    country?: boolean
    consultationMode?: boolean
    linkedin?: boolean
    whatsapp?: boolean
    telegram?: boolean
    googleMapsLink?: boolean
    subscriptionStatus?: boolean
    subscriptionStart?: boolean
    subscriptionEnd?: boolean
    availability?: boolean
    latitude?: boolean
    longitude?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DoctorProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "specialty" | "licenseNumber" | "clinicAddress" | "bio" | "consultationFee" | "gender" | "yearsOfExperience" | "spokenLanguages" | "city" | "country" | "consultationMode" | "linkedin" | "whatsapp" | "telegram" | "googleMapsLink" | "subscriptionStatus" | "subscriptionStart" | "subscriptionEnd" | "availability" | "latitude" | "longitude" | "createdAt" | "updatedAt", ExtArgs["result"]["doctorProfile"]>
  export type DoctorProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoctorProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      specialty: string
      licenseNumber: string
      clinicAddress: string
      bio: string | null
      consultationFee: number | null
      gender: string | null
      yearsOfExperience: number | null
      spokenLanguages: string | null
      city: string | null
      country: string | null
      consultationMode: string | null
      linkedin: string | null
      whatsapp: string | null
      telegram: string | null
      googleMapsLink: string | null
      subscriptionStatus: $Enums.SubscriptionStatus
      subscriptionStart: Date | null
      subscriptionEnd: Date | null
      availability: string | null
      latitude: number | null
      longitude: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["doctorProfile"]>
    composites: {}
  }

  type DoctorProfileGetPayload<S extends boolean | null | undefined | DoctorProfileDefaultArgs> = $Result.GetResult<Prisma.$DoctorProfilePayload, S>

  type DoctorProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorProfileCountAggregateInputType | true
    }

  export interface DoctorProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorProfile'], meta: { name: 'DoctorProfile' } }
    /**
     * Find zero or one DoctorProfile that matches the filter.
     * @param {DoctorProfileFindUniqueArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorProfileFindUniqueArgs>(args: SelectSubset<T, DoctorProfileFindUniqueArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorProfileFindUniqueOrThrowArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileFindFirstArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorProfileFindFirstArgs>(args?: SelectSubset<T, DoctorProfileFindFirstArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileFindFirstOrThrowArgs} args - Arguments to find a DoctorProfile
     * @example
     * // Get one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorProfiles
     * const doctorProfiles = await prisma.doctorProfile.findMany()
     * 
     * // Get first 10 DoctorProfiles
     * const doctorProfiles = await prisma.doctorProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorProfileWithIdOnly = await prisma.doctorProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorProfileFindManyArgs>(args?: SelectSubset<T, DoctorProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorProfile.
     * @param {DoctorProfileCreateArgs} args - Arguments to create a DoctorProfile.
     * @example
     * // Create one DoctorProfile
     * const DoctorProfile = await prisma.doctorProfile.create({
     *   data: {
     *     // ... data to create a DoctorProfile
     *   }
     * })
     * 
     */
    create<T extends DoctorProfileCreateArgs>(args: SelectSubset<T, DoctorProfileCreateArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorProfiles.
     * @param {DoctorProfileCreateManyArgs} args - Arguments to create many DoctorProfiles.
     * @example
     * // Create many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorProfileCreateManyArgs>(args?: SelectSubset<T, DoctorProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorProfiles and returns the data saved in the database.
     * @param {DoctorProfileCreateManyAndReturnArgs} args - Arguments to create many DoctorProfiles.
     * @example
     * // Create many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorProfiles and only return the `id`
     * const doctorProfileWithIdOnly = await prisma.doctorProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorProfile.
     * @param {DoctorProfileDeleteArgs} args - Arguments to delete one DoctorProfile.
     * @example
     * // Delete one DoctorProfile
     * const DoctorProfile = await prisma.doctorProfile.delete({
     *   where: {
     *     // ... filter to delete one DoctorProfile
     *   }
     * })
     * 
     */
    delete<T extends DoctorProfileDeleteArgs>(args: SelectSubset<T, DoctorProfileDeleteArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorProfile.
     * @param {DoctorProfileUpdateArgs} args - Arguments to update one DoctorProfile.
     * @example
     * // Update one DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorProfileUpdateArgs>(args: SelectSubset<T, DoctorProfileUpdateArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorProfiles.
     * @param {DoctorProfileDeleteManyArgs} args - Arguments to filter DoctorProfiles to delete.
     * @example
     * // Delete a few DoctorProfiles
     * const { count } = await prisma.doctorProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorProfileDeleteManyArgs>(args?: SelectSubset<T, DoctorProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorProfileUpdateManyArgs>(args: SelectSubset<T, DoctorProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorProfiles and returns the data updated in the database.
     * @param {DoctorProfileUpdateManyAndReturnArgs} args - Arguments to update many DoctorProfiles.
     * @example
     * // Update many DoctorProfiles
     * const doctorProfile = await prisma.doctorProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorProfiles and only return the `id`
     * const doctorProfileWithIdOnly = await prisma.doctorProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorProfile.
     * @param {DoctorProfileUpsertArgs} args - Arguments to update or create a DoctorProfile.
     * @example
     * // Update or create a DoctorProfile
     * const doctorProfile = await prisma.doctorProfile.upsert({
     *   create: {
     *     // ... data to create a DoctorProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorProfile we want to update
     *   }
     * })
     */
    upsert<T extends DoctorProfileUpsertArgs>(args: SelectSubset<T, DoctorProfileUpsertArgs<ExtArgs>>): Prisma__DoctorProfileClient<$Result.GetResult<Prisma.$DoctorProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileCountArgs} args - Arguments to filter DoctorProfiles to count.
     * @example
     * // Count the number of DoctorProfiles
     * const count = await prisma.doctorProfile.count({
     *   where: {
     *     // ... the filter for the DoctorProfiles we want to count
     *   }
     * })
    **/
    count<T extends DoctorProfileCountArgs>(
      args?: Subset<T, DoctorProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorProfileAggregateArgs>(args: Subset<T, DoctorProfileAggregateArgs>): Prisma.PrismaPromise<GetDoctorProfileAggregateType<T>>

    /**
     * Group by DoctorProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorProfileGroupByArgs['orderBy'] }
        : { orderBy?: DoctorProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorProfile model
   */
  readonly fields: DoctorProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorProfile model
   */
  interface DoctorProfileFieldRefs {
    readonly id: FieldRef<"DoctorProfile", 'String'>
    readonly userId: FieldRef<"DoctorProfile", 'String'>
    readonly specialty: FieldRef<"DoctorProfile", 'String'>
    readonly licenseNumber: FieldRef<"DoctorProfile", 'String'>
    readonly clinicAddress: FieldRef<"DoctorProfile", 'String'>
    readonly bio: FieldRef<"DoctorProfile", 'String'>
    readonly consultationFee: FieldRef<"DoctorProfile", 'Float'>
    readonly gender: FieldRef<"DoctorProfile", 'String'>
    readonly yearsOfExperience: FieldRef<"DoctorProfile", 'Int'>
    readonly spokenLanguages: FieldRef<"DoctorProfile", 'String'>
    readonly city: FieldRef<"DoctorProfile", 'String'>
    readonly country: FieldRef<"DoctorProfile", 'String'>
    readonly consultationMode: FieldRef<"DoctorProfile", 'String'>
    readonly linkedin: FieldRef<"DoctorProfile", 'String'>
    readonly whatsapp: FieldRef<"DoctorProfile", 'String'>
    readonly telegram: FieldRef<"DoctorProfile", 'String'>
    readonly googleMapsLink: FieldRef<"DoctorProfile", 'String'>
    readonly subscriptionStatus: FieldRef<"DoctorProfile", 'SubscriptionStatus'>
    readonly subscriptionStart: FieldRef<"DoctorProfile", 'DateTime'>
    readonly subscriptionEnd: FieldRef<"DoctorProfile", 'DateTime'>
    readonly availability: FieldRef<"DoctorProfile", 'String'>
    readonly latitude: FieldRef<"DoctorProfile", 'Float'>
    readonly longitude: FieldRef<"DoctorProfile", 'Float'>
    readonly createdAt: FieldRef<"DoctorProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"DoctorProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorProfile findUnique
   */
  export type DoctorProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where: DoctorProfileWhereUniqueInput
  }

  /**
   * DoctorProfile findUniqueOrThrow
   */
  export type DoctorProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where: DoctorProfileWhereUniqueInput
  }

  /**
   * DoctorProfile findFirst
   */
  export type DoctorProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where?: DoctorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: DoctorProfileOrderByWithRelationInput | DoctorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorProfiles.
     */
    cursor?: DoctorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorProfiles.
     */
    distinct?: DoctorProfileScalarFieldEnum | DoctorProfileScalarFieldEnum[]
  }

  /**
   * DoctorProfile findFirstOrThrow
   */
  export type DoctorProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DoctorProfile to fetch.
     */
    where?: DoctorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: DoctorProfileOrderByWithRelationInput | DoctorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorProfiles.
     */
    cursor?: DoctorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorProfiles.
     */
    distinct?: DoctorProfileScalarFieldEnum | DoctorProfileScalarFieldEnum[]
  }

  /**
   * DoctorProfile findMany
   */
  export type DoctorProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * Filter, which DoctorProfiles to fetch.
     */
    where?: DoctorProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorProfiles to fetch.
     */
    orderBy?: DoctorProfileOrderByWithRelationInput | DoctorProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorProfiles.
     */
    cursor?: DoctorProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorProfiles.
     */
    skip?: number
    distinct?: DoctorProfileScalarFieldEnum | DoctorProfileScalarFieldEnum[]
  }

  /**
   * DoctorProfile create
   */
  export type DoctorProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorProfile.
     */
    data: XOR<DoctorProfileCreateInput, DoctorProfileUncheckedCreateInput>
  }

  /**
   * DoctorProfile createMany
   */
  export type DoctorProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorProfiles.
     */
    data: DoctorProfileCreateManyInput | DoctorProfileCreateManyInput[]
  }

  /**
   * DoctorProfile createManyAndReturn
   */
  export type DoctorProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorProfiles.
     */
    data: DoctorProfileCreateManyInput | DoctorProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorProfile update
   */
  export type DoctorProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorProfile.
     */
    data: XOR<DoctorProfileUpdateInput, DoctorProfileUncheckedUpdateInput>
    /**
     * Choose, which DoctorProfile to update.
     */
    where: DoctorProfileWhereUniqueInput
  }

  /**
   * DoctorProfile updateMany
   */
  export type DoctorProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorProfiles.
     */
    data: XOR<DoctorProfileUpdateManyMutationInput, DoctorProfileUncheckedUpdateManyInput>
    /**
     * Filter which DoctorProfiles to update
     */
    where?: DoctorProfileWhereInput
    /**
     * Limit how many DoctorProfiles to update.
     */
    limit?: number
  }

  /**
   * DoctorProfile updateManyAndReturn
   */
  export type DoctorProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * The data used to update DoctorProfiles.
     */
    data: XOR<DoctorProfileUpdateManyMutationInput, DoctorProfileUncheckedUpdateManyInput>
    /**
     * Filter which DoctorProfiles to update
     */
    where?: DoctorProfileWhereInput
    /**
     * Limit how many DoctorProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorProfile upsert
   */
  export type DoctorProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorProfile to update in case it exists.
     */
    where: DoctorProfileWhereUniqueInput
    /**
     * In case the DoctorProfile found by the `where` argument doesn't exist, create a new DoctorProfile with this data.
     */
    create: XOR<DoctorProfileCreateInput, DoctorProfileUncheckedCreateInput>
    /**
     * In case the DoctorProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorProfileUpdateInput, DoctorProfileUncheckedUpdateInput>
  }

  /**
   * DoctorProfile delete
   */
  export type DoctorProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
    /**
     * Filter which DoctorProfile to delete.
     */
    where: DoctorProfileWhereUniqueInput
  }

  /**
   * DoctorProfile deleteMany
   */
  export type DoctorProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorProfiles to delete
     */
    where?: DoctorProfileWhereInput
    /**
     * Limit how many DoctorProfiles to delete.
     */
    limit?: number
  }

  /**
   * DoctorProfile without action
   */
  export type DoctorProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorProfile
     */
    select?: DoctorProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorProfile
     */
    omit?: DoctorProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorProfileInclude<ExtArgs> | null
  }


  /**
   * Model HealthProfile
   */

  export type AggregateHealthProfile = {
    _count: HealthProfileCountAggregateOutputType | null
    _avg: HealthProfileAvgAggregateOutputType | null
    _sum: HealthProfileSumAggregateOutputType | null
    _min: HealthProfileMinAggregateOutputType | null
    _max: HealthProfileMaxAggregateOutputType | null
  }

  export type HealthProfileAvgAggregateOutputType = {
    height: number | null
    weight: number | null
  }

  export type HealthProfileSumAggregateOutputType = {
    height: number | null
    weight: number | null
  }

  export type HealthProfileMinAggregateOutputType = {
    id: string | null
    userId: string | null
    birthDate: Date | null
    gender: string | null
    height: number | null
    weight: number | null
    bloodType: string | null
    diet: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HealthProfileMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    birthDate: Date | null
    gender: string | null
    height: number | null
    weight: number | null
    bloodType: string | null
    diet: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type HealthProfileCountAggregateOutputType = {
    id: number
    userId: number
    birthDate: number
    gender: number
    height: number
    weight: number
    bloodType: number
    diet: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type HealthProfileAvgAggregateInputType = {
    height?: true
    weight?: true
  }

  export type HealthProfileSumAggregateInputType = {
    height?: true
    weight?: true
  }

  export type HealthProfileMinAggregateInputType = {
    id?: true
    userId?: true
    birthDate?: true
    gender?: true
    height?: true
    weight?: true
    bloodType?: true
    diet?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HealthProfileMaxAggregateInputType = {
    id?: true
    userId?: true
    birthDate?: true
    gender?: true
    height?: true
    weight?: true
    bloodType?: true
    diet?: true
    createdAt?: true
    updatedAt?: true
  }

  export type HealthProfileCountAggregateInputType = {
    id?: true
    userId?: true
    birthDate?: true
    gender?: true
    height?: true
    weight?: true
    bloodType?: true
    diet?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type HealthProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthProfile to aggregate.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HealthProfiles
    **/
    _count?: true | HealthProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HealthProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HealthProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HealthProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HealthProfileMaxAggregateInputType
  }

  export type GetHealthProfileAggregateType<T extends HealthProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateHealthProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHealthProfile[P]>
      : GetScalarType<T[P], AggregateHealthProfile[P]>
  }




  export type HealthProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HealthProfileWhereInput
    orderBy?: HealthProfileOrderByWithAggregationInput | HealthProfileOrderByWithAggregationInput[]
    by: HealthProfileScalarFieldEnum[] | HealthProfileScalarFieldEnum
    having?: HealthProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HealthProfileCountAggregateInputType | true
    _avg?: HealthProfileAvgAggregateInputType
    _sum?: HealthProfileSumAggregateInputType
    _min?: HealthProfileMinAggregateInputType
    _max?: HealthProfileMaxAggregateInputType
  }

  export type HealthProfileGroupByOutputType = {
    id: string
    userId: string
    birthDate: Date | null
    gender: string | null
    height: number | null
    weight: number | null
    bloodType: string | null
    diet: string | null
    createdAt: Date
    updatedAt: Date
    _count: HealthProfileCountAggregateOutputType | null
    _avg: HealthProfileAvgAggregateOutputType | null
    _sum: HealthProfileSumAggregateOutputType | null
    _min: HealthProfileMinAggregateOutputType | null
    _max: HealthProfileMaxAggregateOutputType | null
  }

  type GetHealthProfileGroupByPayload<T extends HealthProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HealthProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HealthProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HealthProfileGroupByOutputType[P]>
            : GetScalarType<T[P], HealthProfileGroupByOutputType[P]>
        }
      >
    >


  export type HealthProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    birthDate?: boolean
    gender?: boolean
    height?: boolean
    weight?: boolean
    bloodType?: boolean
    diet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthProfile"]>

  export type HealthProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    birthDate?: boolean
    gender?: boolean
    height?: boolean
    weight?: boolean
    bloodType?: boolean
    diet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthProfile"]>

  export type HealthProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    birthDate?: boolean
    gender?: boolean
    height?: boolean
    weight?: boolean
    bloodType?: boolean
    diet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["healthProfile"]>

  export type HealthProfileSelectScalar = {
    id?: boolean
    userId?: boolean
    birthDate?: boolean
    gender?: boolean
    height?: boolean
    weight?: boolean
    bloodType?: boolean
    diet?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type HealthProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "birthDate" | "gender" | "height" | "weight" | "bloodType" | "diet" | "createdAt" | "updatedAt", ExtArgs["result"]["healthProfile"]>
  export type HealthProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HealthProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type HealthProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $HealthProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HealthProfile"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      birthDate: Date | null
      gender: string | null
      height: number | null
      weight: number | null
      bloodType: string | null
      diet: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["healthProfile"]>
    composites: {}
  }

  type HealthProfileGetPayload<S extends boolean | null | undefined | HealthProfileDefaultArgs> = $Result.GetResult<Prisma.$HealthProfilePayload, S>

  type HealthProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HealthProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HealthProfileCountAggregateInputType | true
    }

  export interface HealthProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HealthProfile'], meta: { name: 'HealthProfile' } }
    /**
     * Find zero or one HealthProfile that matches the filter.
     * @param {HealthProfileFindUniqueArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HealthProfileFindUniqueArgs>(args: SelectSubset<T, HealthProfileFindUniqueArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one HealthProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HealthProfileFindUniqueOrThrowArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HealthProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, HealthProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileFindFirstArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HealthProfileFindFirstArgs>(args?: SelectSubset<T, HealthProfileFindFirstArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first HealthProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileFindFirstOrThrowArgs} args - Arguments to find a HealthProfile
     * @example
     * // Get one HealthProfile
     * const healthProfile = await prisma.healthProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HealthProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, HealthProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more HealthProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HealthProfiles
     * const healthProfiles = await prisma.healthProfile.findMany()
     * 
     * // Get first 10 HealthProfiles
     * const healthProfiles = await prisma.healthProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const healthProfileWithIdOnly = await prisma.healthProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HealthProfileFindManyArgs>(args?: SelectSubset<T, HealthProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a HealthProfile.
     * @param {HealthProfileCreateArgs} args - Arguments to create a HealthProfile.
     * @example
     * // Create one HealthProfile
     * const HealthProfile = await prisma.healthProfile.create({
     *   data: {
     *     // ... data to create a HealthProfile
     *   }
     * })
     * 
     */
    create<T extends HealthProfileCreateArgs>(args: SelectSubset<T, HealthProfileCreateArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many HealthProfiles.
     * @param {HealthProfileCreateManyArgs} args - Arguments to create many HealthProfiles.
     * @example
     * // Create many HealthProfiles
     * const healthProfile = await prisma.healthProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HealthProfileCreateManyArgs>(args?: SelectSubset<T, HealthProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HealthProfiles and returns the data saved in the database.
     * @param {HealthProfileCreateManyAndReturnArgs} args - Arguments to create many HealthProfiles.
     * @example
     * // Create many HealthProfiles
     * const healthProfile = await prisma.healthProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HealthProfiles and only return the `id`
     * const healthProfileWithIdOnly = await prisma.healthProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HealthProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, HealthProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a HealthProfile.
     * @param {HealthProfileDeleteArgs} args - Arguments to delete one HealthProfile.
     * @example
     * // Delete one HealthProfile
     * const HealthProfile = await prisma.healthProfile.delete({
     *   where: {
     *     // ... filter to delete one HealthProfile
     *   }
     * })
     * 
     */
    delete<T extends HealthProfileDeleteArgs>(args: SelectSubset<T, HealthProfileDeleteArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one HealthProfile.
     * @param {HealthProfileUpdateArgs} args - Arguments to update one HealthProfile.
     * @example
     * // Update one HealthProfile
     * const healthProfile = await prisma.healthProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HealthProfileUpdateArgs>(args: SelectSubset<T, HealthProfileUpdateArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more HealthProfiles.
     * @param {HealthProfileDeleteManyArgs} args - Arguments to filter HealthProfiles to delete.
     * @example
     * // Delete a few HealthProfiles
     * const { count } = await prisma.healthProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HealthProfileDeleteManyArgs>(args?: SelectSubset<T, HealthProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HealthProfiles
     * const healthProfile = await prisma.healthProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HealthProfileUpdateManyArgs>(args: SelectSubset<T, HealthProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HealthProfiles and returns the data updated in the database.
     * @param {HealthProfileUpdateManyAndReturnArgs} args - Arguments to update many HealthProfiles.
     * @example
     * // Update many HealthProfiles
     * const healthProfile = await prisma.healthProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more HealthProfiles and only return the `id`
     * const healthProfileWithIdOnly = await prisma.healthProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HealthProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, HealthProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one HealthProfile.
     * @param {HealthProfileUpsertArgs} args - Arguments to update or create a HealthProfile.
     * @example
     * // Update or create a HealthProfile
     * const healthProfile = await prisma.healthProfile.upsert({
     *   create: {
     *     // ... data to create a HealthProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HealthProfile we want to update
     *   }
     * })
     */
    upsert<T extends HealthProfileUpsertArgs>(args: SelectSubset<T, HealthProfileUpsertArgs<ExtArgs>>): Prisma__HealthProfileClient<$Result.GetResult<Prisma.$HealthProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of HealthProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileCountArgs} args - Arguments to filter HealthProfiles to count.
     * @example
     * // Count the number of HealthProfiles
     * const count = await prisma.healthProfile.count({
     *   where: {
     *     // ... the filter for the HealthProfiles we want to count
     *   }
     * })
    **/
    count<T extends HealthProfileCountArgs>(
      args?: Subset<T, HealthProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HealthProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HealthProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HealthProfileAggregateArgs>(args: Subset<T, HealthProfileAggregateArgs>): Prisma.PrismaPromise<GetHealthProfileAggregateType<T>>

    /**
     * Group by HealthProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HealthProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HealthProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HealthProfileGroupByArgs['orderBy'] }
        : { orderBy?: HealthProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HealthProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHealthProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HealthProfile model
   */
  readonly fields: HealthProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HealthProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HealthProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HealthProfile model
   */
  interface HealthProfileFieldRefs {
    readonly id: FieldRef<"HealthProfile", 'String'>
    readonly userId: FieldRef<"HealthProfile", 'String'>
    readonly birthDate: FieldRef<"HealthProfile", 'DateTime'>
    readonly gender: FieldRef<"HealthProfile", 'String'>
    readonly height: FieldRef<"HealthProfile", 'Float'>
    readonly weight: FieldRef<"HealthProfile", 'Float'>
    readonly bloodType: FieldRef<"HealthProfile", 'String'>
    readonly diet: FieldRef<"HealthProfile", 'String'>
    readonly createdAt: FieldRef<"HealthProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"HealthProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HealthProfile findUnique
   */
  export type HealthProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile findUniqueOrThrow
   */
  export type HealthProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile findFirst
   */
  export type HealthProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthProfiles.
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthProfiles.
     */
    distinct?: HealthProfileScalarFieldEnum | HealthProfileScalarFieldEnum[]
  }

  /**
   * HealthProfile findFirstOrThrow
   */
  export type HealthProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfile to fetch.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HealthProfiles.
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HealthProfiles.
     */
    distinct?: HealthProfileScalarFieldEnum | HealthProfileScalarFieldEnum[]
  }

  /**
   * HealthProfile findMany
   */
  export type HealthProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter, which HealthProfiles to fetch.
     */
    where?: HealthProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HealthProfiles to fetch.
     */
    orderBy?: HealthProfileOrderByWithRelationInput | HealthProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HealthProfiles.
     */
    cursor?: HealthProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HealthProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HealthProfiles.
     */
    skip?: number
    distinct?: HealthProfileScalarFieldEnum | HealthProfileScalarFieldEnum[]
  }

  /**
   * HealthProfile create
   */
  export type HealthProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a HealthProfile.
     */
    data: XOR<HealthProfileCreateInput, HealthProfileUncheckedCreateInput>
  }

  /**
   * HealthProfile createMany
   */
  export type HealthProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HealthProfiles.
     */
    data: HealthProfileCreateManyInput | HealthProfileCreateManyInput[]
  }

  /**
   * HealthProfile createManyAndReturn
   */
  export type HealthProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * The data used to create many HealthProfiles.
     */
    data: HealthProfileCreateManyInput | HealthProfileCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthProfile update
   */
  export type HealthProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a HealthProfile.
     */
    data: XOR<HealthProfileUpdateInput, HealthProfileUncheckedUpdateInput>
    /**
     * Choose, which HealthProfile to update.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile updateMany
   */
  export type HealthProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HealthProfiles.
     */
    data: XOR<HealthProfileUpdateManyMutationInput, HealthProfileUncheckedUpdateManyInput>
    /**
     * Filter which HealthProfiles to update
     */
    where?: HealthProfileWhereInput
    /**
     * Limit how many HealthProfiles to update.
     */
    limit?: number
  }

  /**
   * HealthProfile updateManyAndReturn
   */
  export type HealthProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * The data used to update HealthProfiles.
     */
    data: XOR<HealthProfileUpdateManyMutationInput, HealthProfileUncheckedUpdateManyInput>
    /**
     * Filter which HealthProfiles to update
     */
    where?: HealthProfileWhereInput
    /**
     * Limit how many HealthProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * HealthProfile upsert
   */
  export type HealthProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the HealthProfile to update in case it exists.
     */
    where: HealthProfileWhereUniqueInput
    /**
     * In case the HealthProfile found by the `where` argument doesn't exist, create a new HealthProfile with this data.
     */
    create: XOR<HealthProfileCreateInput, HealthProfileUncheckedCreateInput>
    /**
     * In case the HealthProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HealthProfileUpdateInput, HealthProfileUncheckedUpdateInput>
  }

  /**
   * HealthProfile delete
   */
  export type HealthProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
    /**
     * Filter which HealthProfile to delete.
     */
    where: HealthProfileWhereUniqueInput
  }

  /**
   * HealthProfile deleteMany
   */
  export type HealthProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HealthProfiles to delete
     */
    where?: HealthProfileWhereInput
    /**
     * Limit how many HealthProfiles to delete.
     */
    limit?: number
  }

  /**
   * HealthProfile without action
   */
  export type HealthProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HealthProfile
     */
    select?: HealthProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the HealthProfile
     */
    omit?: HealthProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HealthProfileInclude<ExtArgs> | null
  }


  /**
   * Model DoctorPatient
   */

  export type AggregateDoctorPatient = {
    _count: DoctorPatientCountAggregateOutputType | null
    _avg: DoctorPatientAvgAggregateOutputType | null
    _sum: DoctorPatientSumAggregateOutputType | null
    _min: DoctorPatientMinAggregateOutputType | null
    _max: DoctorPatientMaxAggregateOutputType | null
  }

  export type DoctorPatientAvgAggregateOutputType = {
    heartRate: number | null
    temperature: number | null
  }

  export type DoctorPatientSumAggregateOutputType = {
    heartRate: number | null
    temperature: number | null
  }

  export type DoctorPatientMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    status: string | null
    notes: string | null
    diseases: string | null
    allergies: string | null
    medications: string | null
    medicalHistory: string | null
    familyHistory: string | null
    surgeryHistory: string | null
    bloodPressure: string | null
    heartRate: number | null
    temperature: number | null
    symptoms: string | null
    diagnosis: string | null
    treatmentPlan: string | null
    examsRequested: string | null
    observation: string | null
    recommendations: string | null
    documents: string | null
    nextConsultation: Date | null
    consultationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorPatientMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    status: string | null
    notes: string | null
    diseases: string | null
    allergies: string | null
    medications: string | null
    medicalHistory: string | null
    familyHistory: string | null
    surgeryHistory: string | null
    bloodPressure: string | null
    heartRate: number | null
    temperature: number | null
    symptoms: string | null
    diagnosis: string | null
    treatmentPlan: string | null
    examsRequested: string | null
    observation: string | null
    recommendations: string | null
    documents: string | null
    nextConsultation: Date | null
    consultationReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DoctorPatientCountAggregateOutputType = {
    id: number
    doctorId: number
    patientId: number
    status: number
    notes: number
    diseases: number
    allergies: number
    medications: number
    medicalHistory: number
    familyHistory: number
    surgeryHistory: number
    bloodPressure: number
    heartRate: number
    temperature: number
    symptoms: number
    diagnosis: number
    treatmentPlan: number
    examsRequested: number
    observation: number
    recommendations: number
    documents: number
    nextConsultation: number
    consultationReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DoctorPatientAvgAggregateInputType = {
    heartRate?: true
    temperature?: true
  }

  export type DoctorPatientSumAggregateInputType = {
    heartRate?: true
    temperature?: true
  }

  export type DoctorPatientMinAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    status?: true
    notes?: true
    diseases?: true
    allergies?: true
    medications?: true
    medicalHistory?: true
    familyHistory?: true
    surgeryHistory?: true
    bloodPressure?: true
    heartRate?: true
    temperature?: true
    symptoms?: true
    diagnosis?: true
    treatmentPlan?: true
    examsRequested?: true
    observation?: true
    recommendations?: true
    documents?: true
    nextConsultation?: true
    consultationReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorPatientMaxAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    status?: true
    notes?: true
    diseases?: true
    allergies?: true
    medications?: true
    medicalHistory?: true
    familyHistory?: true
    surgeryHistory?: true
    bloodPressure?: true
    heartRate?: true
    temperature?: true
    symptoms?: true
    diagnosis?: true
    treatmentPlan?: true
    examsRequested?: true
    observation?: true
    recommendations?: true
    documents?: true
    nextConsultation?: true
    consultationReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DoctorPatientCountAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    status?: true
    notes?: true
    diseases?: true
    allergies?: true
    medications?: true
    medicalHistory?: true
    familyHistory?: true
    surgeryHistory?: true
    bloodPressure?: true
    heartRate?: true
    temperature?: true
    symptoms?: true
    diagnosis?: true
    treatmentPlan?: true
    examsRequested?: true
    observation?: true
    recommendations?: true
    documents?: true
    nextConsultation?: true
    consultationReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DoctorPatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorPatient to aggregate.
     */
    where?: DoctorPatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorPatients to fetch.
     */
    orderBy?: DoctorPatientOrderByWithRelationInput | DoctorPatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DoctorPatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorPatients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorPatients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DoctorPatients
    **/
    _count?: true | DoctorPatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DoctorPatientAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DoctorPatientSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DoctorPatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DoctorPatientMaxAggregateInputType
  }

  export type GetDoctorPatientAggregateType<T extends DoctorPatientAggregateArgs> = {
        [P in keyof T & keyof AggregateDoctorPatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDoctorPatient[P]>
      : GetScalarType<T[P], AggregateDoctorPatient[P]>
  }




  export type DoctorPatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DoctorPatientWhereInput
    orderBy?: DoctorPatientOrderByWithAggregationInput | DoctorPatientOrderByWithAggregationInput[]
    by: DoctorPatientScalarFieldEnum[] | DoctorPatientScalarFieldEnum
    having?: DoctorPatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DoctorPatientCountAggregateInputType | true
    _avg?: DoctorPatientAvgAggregateInputType
    _sum?: DoctorPatientSumAggregateInputType
    _min?: DoctorPatientMinAggregateInputType
    _max?: DoctorPatientMaxAggregateInputType
  }

  export type DoctorPatientGroupByOutputType = {
    id: string
    doctorId: string
    patientId: string
    status: string
    notes: string | null
    diseases: string | null
    allergies: string | null
    medications: string | null
    medicalHistory: string | null
    familyHistory: string | null
    surgeryHistory: string | null
    bloodPressure: string | null
    heartRate: number | null
    temperature: number | null
    symptoms: string | null
    diagnosis: string | null
    treatmentPlan: string | null
    examsRequested: string | null
    observation: string | null
    recommendations: string | null
    documents: string | null
    nextConsultation: Date | null
    consultationReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: DoctorPatientCountAggregateOutputType | null
    _avg: DoctorPatientAvgAggregateOutputType | null
    _sum: DoctorPatientSumAggregateOutputType | null
    _min: DoctorPatientMinAggregateOutputType | null
    _max: DoctorPatientMaxAggregateOutputType | null
  }

  type GetDoctorPatientGroupByPayload<T extends DoctorPatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DoctorPatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DoctorPatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DoctorPatientGroupByOutputType[P]>
            : GetScalarType<T[P], DoctorPatientGroupByOutputType[P]>
        }
      >
    >


  export type DoctorPatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    status?: boolean
    notes?: boolean
    diseases?: boolean
    allergies?: boolean
    medications?: boolean
    medicalHistory?: boolean
    familyHistory?: boolean
    surgeryHistory?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    temperature?: boolean
    symptoms?: boolean
    diagnosis?: boolean
    treatmentPlan?: boolean
    examsRequested?: boolean
    observation?: boolean
    recommendations?: boolean
    documents?: boolean
    nextConsultation?: boolean
    consultationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorPatient"]>

  export type DoctorPatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    status?: boolean
    notes?: boolean
    diseases?: boolean
    allergies?: boolean
    medications?: boolean
    medicalHistory?: boolean
    familyHistory?: boolean
    surgeryHistory?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    temperature?: boolean
    symptoms?: boolean
    diagnosis?: boolean
    treatmentPlan?: boolean
    examsRequested?: boolean
    observation?: boolean
    recommendations?: boolean
    documents?: boolean
    nextConsultation?: boolean
    consultationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorPatient"]>

  export type DoctorPatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    status?: boolean
    notes?: boolean
    diseases?: boolean
    allergies?: boolean
    medications?: boolean
    medicalHistory?: boolean
    familyHistory?: boolean
    surgeryHistory?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    temperature?: boolean
    symptoms?: boolean
    diagnosis?: boolean
    treatmentPlan?: boolean
    examsRequested?: boolean
    observation?: boolean
    recommendations?: boolean
    documents?: boolean
    nextConsultation?: boolean
    consultationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["doctorPatient"]>

  export type DoctorPatientSelectScalar = {
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    status?: boolean
    notes?: boolean
    diseases?: boolean
    allergies?: boolean
    medications?: boolean
    medicalHistory?: boolean
    familyHistory?: boolean
    surgeryHistory?: boolean
    bloodPressure?: boolean
    heartRate?: boolean
    temperature?: boolean
    symptoms?: boolean
    diagnosis?: boolean
    treatmentPlan?: boolean
    examsRequested?: boolean
    observation?: boolean
    recommendations?: boolean
    documents?: boolean
    nextConsultation?: boolean
    consultationReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DoctorPatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "patientId" | "status" | "notes" | "diseases" | "allergies" | "medications" | "medicalHistory" | "familyHistory" | "surgeryHistory" | "bloodPressure" | "heartRate" | "temperature" | "symptoms" | "diagnosis" | "treatmentPlan" | "examsRequested" | "observation" | "recommendations" | "documents" | "nextConsultation" | "consultationReason" | "createdAt" | "updatedAt", ExtArgs["result"]["doctorPatient"]>
  export type DoctorPatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorPatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type DoctorPatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $DoctorPatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DoctorPatient"
    objects: {
      doctor: Prisma.$UserPayload<ExtArgs>
      patient: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      patientId: string
      status: string
      notes: string | null
      diseases: string | null
      allergies: string | null
      medications: string | null
      medicalHistory: string | null
      familyHistory: string | null
      surgeryHistory: string | null
      bloodPressure: string | null
      heartRate: number | null
      temperature: number | null
      symptoms: string | null
      diagnosis: string | null
      treatmentPlan: string | null
      examsRequested: string | null
      observation: string | null
      recommendations: string | null
      documents: string | null
      nextConsultation: Date | null
      consultationReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["doctorPatient"]>
    composites: {}
  }

  type DoctorPatientGetPayload<S extends boolean | null | undefined | DoctorPatientDefaultArgs> = $Result.GetResult<Prisma.$DoctorPatientPayload, S>

  type DoctorPatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DoctorPatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DoctorPatientCountAggregateInputType | true
    }

  export interface DoctorPatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DoctorPatient'], meta: { name: 'DoctorPatient' } }
    /**
     * Find zero or one DoctorPatient that matches the filter.
     * @param {DoctorPatientFindUniqueArgs} args - Arguments to find a DoctorPatient
     * @example
     * // Get one DoctorPatient
     * const doctorPatient = await prisma.doctorPatient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DoctorPatientFindUniqueArgs>(args: SelectSubset<T, DoctorPatientFindUniqueArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DoctorPatient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DoctorPatientFindUniqueOrThrowArgs} args - Arguments to find a DoctorPatient
     * @example
     * // Get one DoctorPatient
     * const doctorPatient = await prisma.doctorPatient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DoctorPatientFindUniqueOrThrowArgs>(args: SelectSubset<T, DoctorPatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorPatient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorPatientFindFirstArgs} args - Arguments to find a DoctorPatient
     * @example
     * // Get one DoctorPatient
     * const doctorPatient = await prisma.doctorPatient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DoctorPatientFindFirstArgs>(args?: SelectSubset<T, DoctorPatientFindFirstArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DoctorPatient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorPatientFindFirstOrThrowArgs} args - Arguments to find a DoctorPatient
     * @example
     * // Get one DoctorPatient
     * const doctorPatient = await prisma.doctorPatient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DoctorPatientFindFirstOrThrowArgs>(args?: SelectSubset<T, DoctorPatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DoctorPatients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorPatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DoctorPatients
     * const doctorPatients = await prisma.doctorPatient.findMany()
     * 
     * // Get first 10 DoctorPatients
     * const doctorPatients = await prisma.doctorPatient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const doctorPatientWithIdOnly = await prisma.doctorPatient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DoctorPatientFindManyArgs>(args?: SelectSubset<T, DoctorPatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DoctorPatient.
     * @param {DoctorPatientCreateArgs} args - Arguments to create a DoctorPatient.
     * @example
     * // Create one DoctorPatient
     * const DoctorPatient = await prisma.doctorPatient.create({
     *   data: {
     *     // ... data to create a DoctorPatient
     *   }
     * })
     * 
     */
    create<T extends DoctorPatientCreateArgs>(args: SelectSubset<T, DoctorPatientCreateArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DoctorPatients.
     * @param {DoctorPatientCreateManyArgs} args - Arguments to create many DoctorPatients.
     * @example
     * // Create many DoctorPatients
     * const doctorPatient = await prisma.doctorPatient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DoctorPatientCreateManyArgs>(args?: SelectSubset<T, DoctorPatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DoctorPatients and returns the data saved in the database.
     * @param {DoctorPatientCreateManyAndReturnArgs} args - Arguments to create many DoctorPatients.
     * @example
     * // Create many DoctorPatients
     * const doctorPatient = await prisma.doctorPatient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DoctorPatients and only return the `id`
     * const doctorPatientWithIdOnly = await prisma.doctorPatient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DoctorPatientCreateManyAndReturnArgs>(args?: SelectSubset<T, DoctorPatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DoctorPatient.
     * @param {DoctorPatientDeleteArgs} args - Arguments to delete one DoctorPatient.
     * @example
     * // Delete one DoctorPatient
     * const DoctorPatient = await prisma.doctorPatient.delete({
     *   where: {
     *     // ... filter to delete one DoctorPatient
     *   }
     * })
     * 
     */
    delete<T extends DoctorPatientDeleteArgs>(args: SelectSubset<T, DoctorPatientDeleteArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DoctorPatient.
     * @param {DoctorPatientUpdateArgs} args - Arguments to update one DoctorPatient.
     * @example
     * // Update one DoctorPatient
     * const doctorPatient = await prisma.doctorPatient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DoctorPatientUpdateArgs>(args: SelectSubset<T, DoctorPatientUpdateArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DoctorPatients.
     * @param {DoctorPatientDeleteManyArgs} args - Arguments to filter DoctorPatients to delete.
     * @example
     * // Delete a few DoctorPatients
     * const { count } = await prisma.doctorPatient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DoctorPatientDeleteManyArgs>(args?: SelectSubset<T, DoctorPatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorPatients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorPatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DoctorPatients
     * const doctorPatient = await prisma.doctorPatient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DoctorPatientUpdateManyArgs>(args: SelectSubset<T, DoctorPatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DoctorPatients and returns the data updated in the database.
     * @param {DoctorPatientUpdateManyAndReturnArgs} args - Arguments to update many DoctorPatients.
     * @example
     * // Update many DoctorPatients
     * const doctorPatient = await prisma.doctorPatient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DoctorPatients and only return the `id`
     * const doctorPatientWithIdOnly = await prisma.doctorPatient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DoctorPatientUpdateManyAndReturnArgs>(args: SelectSubset<T, DoctorPatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DoctorPatient.
     * @param {DoctorPatientUpsertArgs} args - Arguments to update or create a DoctorPatient.
     * @example
     * // Update or create a DoctorPatient
     * const doctorPatient = await prisma.doctorPatient.upsert({
     *   create: {
     *     // ... data to create a DoctorPatient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DoctorPatient we want to update
     *   }
     * })
     */
    upsert<T extends DoctorPatientUpsertArgs>(args: SelectSubset<T, DoctorPatientUpsertArgs<ExtArgs>>): Prisma__DoctorPatientClient<$Result.GetResult<Prisma.$DoctorPatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DoctorPatients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorPatientCountArgs} args - Arguments to filter DoctorPatients to count.
     * @example
     * // Count the number of DoctorPatients
     * const count = await prisma.doctorPatient.count({
     *   where: {
     *     // ... the filter for the DoctorPatients we want to count
     *   }
     * })
    **/
    count<T extends DoctorPatientCountArgs>(
      args?: Subset<T, DoctorPatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DoctorPatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DoctorPatient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorPatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DoctorPatientAggregateArgs>(args: Subset<T, DoctorPatientAggregateArgs>): Prisma.PrismaPromise<GetDoctorPatientAggregateType<T>>

    /**
     * Group by DoctorPatient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DoctorPatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DoctorPatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DoctorPatientGroupByArgs['orderBy'] }
        : { orderBy?: DoctorPatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DoctorPatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDoctorPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DoctorPatient model
   */
  readonly fields: DoctorPatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DoctorPatient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DoctorPatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DoctorPatient model
   */
  interface DoctorPatientFieldRefs {
    readonly id: FieldRef<"DoctorPatient", 'String'>
    readonly doctorId: FieldRef<"DoctorPatient", 'String'>
    readonly patientId: FieldRef<"DoctorPatient", 'String'>
    readonly status: FieldRef<"DoctorPatient", 'String'>
    readonly notes: FieldRef<"DoctorPatient", 'String'>
    readonly diseases: FieldRef<"DoctorPatient", 'String'>
    readonly allergies: FieldRef<"DoctorPatient", 'String'>
    readonly medications: FieldRef<"DoctorPatient", 'String'>
    readonly medicalHistory: FieldRef<"DoctorPatient", 'String'>
    readonly familyHistory: FieldRef<"DoctorPatient", 'String'>
    readonly surgeryHistory: FieldRef<"DoctorPatient", 'String'>
    readonly bloodPressure: FieldRef<"DoctorPatient", 'String'>
    readonly heartRate: FieldRef<"DoctorPatient", 'Int'>
    readonly temperature: FieldRef<"DoctorPatient", 'Float'>
    readonly symptoms: FieldRef<"DoctorPatient", 'String'>
    readonly diagnosis: FieldRef<"DoctorPatient", 'String'>
    readonly treatmentPlan: FieldRef<"DoctorPatient", 'String'>
    readonly examsRequested: FieldRef<"DoctorPatient", 'String'>
    readonly observation: FieldRef<"DoctorPatient", 'String'>
    readonly recommendations: FieldRef<"DoctorPatient", 'String'>
    readonly documents: FieldRef<"DoctorPatient", 'String'>
    readonly nextConsultation: FieldRef<"DoctorPatient", 'DateTime'>
    readonly consultationReason: FieldRef<"DoctorPatient", 'String'>
    readonly createdAt: FieldRef<"DoctorPatient", 'DateTime'>
    readonly updatedAt: FieldRef<"DoctorPatient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DoctorPatient findUnique
   */
  export type DoctorPatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * Filter, which DoctorPatient to fetch.
     */
    where: DoctorPatientWhereUniqueInput
  }

  /**
   * DoctorPatient findUniqueOrThrow
   */
  export type DoctorPatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * Filter, which DoctorPatient to fetch.
     */
    where: DoctorPatientWhereUniqueInput
  }

  /**
   * DoctorPatient findFirst
   */
  export type DoctorPatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * Filter, which DoctorPatient to fetch.
     */
    where?: DoctorPatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorPatients to fetch.
     */
    orderBy?: DoctorPatientOrderByWithRelationInput | DoctorPatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorPatients.
     */
    cursor?: DoctorPatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorPatients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorPatients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorPatients.
     */
    distinct?: DoctorPatientScalarFieldEnum | DoctorPatientScalarFieldEnum[]
  }

  /**
   * DoctorPatient findFirstOrThrow
   */
  export type DoctorPatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * Filter, which DoctorPatient to fetch.
     */
    where?: DoctorPatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorPatients to fetch.
     */
    orderBy?: DoctorPatientOrderByWithRelationInput | DoctorPatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DoctorPatients.
     */
    cursor?: DoctorPatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorPatients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorPatients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DoctorPatients.
     */
    distinct?: DoctorPatientScalarFieldEnum | DoctorPatientScalarFieldEnum[]
  }

  /**
   * DoctorPatient findMany
   */
  export type DoctorPatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * Filter, which DoctorPatients to fetch.
     */
    where?: DoctorPatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DoctorPatients to fetch.
     */
    orderBy?: DoctorPatientOrderByWithRelationInput | DoctorPatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DoctorPatients.
     */
    cursor?: DoctorPatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DoctorPatients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DoctorPatients.
     */
    skip?: number
    distinct?: DoctorPatientScalarFieldEnum | DoctorPatientScalarFieldEnum[]
  }

  /**
   * DoctorPatient create
   */
  export type DoctorPatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * The data needed to create a DoctorPatient.
     */
    data: XOR<DoctorPatientCreateInput, DoctorPatientUncheckedCreateInput>
  }

  /**
   * DoctorPatient createMany
   */
  export type DoctorPatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DoctorPatients.
     */
    data: DoctorPatientCreateManyInput | DoctorPatientCreateManyInput[]
  }

  /**
   * DoctorPatient createManyAndReturn
   */
  export type DoctorPatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * The data used to create many DoctorPatients.
     */
    data: DoctorPatientCreateManyInput | DoctorPatientCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorPatient update
   */
  export type DoctorPatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * The data needed to update a DoctorPatient.
     */
    data: XOR<DoctorPatientUpdateInput, DoctorPatientUncheckedUpdateInput>
    /**
     * Choose, which DoctorPatient to update.
     */
    where: DoctorPatientWhereUniqueInput
  }

  /**
   * DoctorPatient updateMany
   */
  export type DoctorPatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DoctorPatients.
     */
    data: XOR<DoctorPatientUpdateManyMutationInput, DoctorPatientUncheckedUpdateManyInput>
    /**
     * Filter which DoctorPatients to update
     */
    where?: DoctorPatientWhereInput
    /**
     * Limit how many DoctorPatients to update.
     */
    limit?: number
  }

  /**
   * DoctorPatient updateManyAndReturn
   */
  export type DoctorPatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * The data used to update DoctorPatients.
     */
    data: XOR<DoctorPatientUpdateManyMutationInput, DoctorPatientUncheckedUpdateManyInput>
    /**
     * Filter which DoctorPatients to update
     */
    where?: DoctorPatientWhereInput
    /**
     * Limit how many DoctorPatients to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DoctorPatient upsert
   */
  export type DoctorPatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * The filter to search for the DoctorPatient to update in case it exists.
     */
    where: DoctorPatientWhereUniqueInput
    /**
     * In case the DoctorPatient found by the `where` argument doesn't exist, create a new DoctorPatient with this data.
     */
    create: XOR<DoctorPatientCreateInput, DoctorPatientUncheckedCreateInput>
    /**
     * In case the DoctorPatient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DoctorPatientUpdateInput, DoctorPatientUncheckedUpdateInput>
  }

  /**
   * DoctorPatient delete
   */
  export type DoctorPatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
    /**
     * Filter which DoctorPatient to delete.
     */
    where: DoctorPatientWhereUniqueInput
  }

  /**
   * DoctorPatient deleteMany
   */
  export type DoctorPatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DoctorPatients to delete
     */
    where?: DoctorPatientWhereInput
    /**
     * Limit how many DoctorPatients to delete.
     */
    limit?: number
  }

  /**
   * DoctorPatient without action
   */
  export type DoctorPatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DoctorPatient
     */
    select?: DoctorPatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DoctorPatient
     */
    omit?: DoctorPatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DoctorPatientInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentAvgAggregateOutputType = {
    duration: number | null
  }

  export type AppointmentSumAggregateOutputType = {
    duration: number | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    date: Date | null
    duration: number | null
    type: string | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    doctorId: string | null
    patientId: string | null
    date: Date | null
    duration: number | null
    type: string | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    doctorId: number
    patientId: number
    date: number
    duration: number
    type: number
    status: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AppointmentAvgAggregateInputType = {
    duration?: true
  }

  export type AppointmentSumAggregateInputType = {
    duration?: true
  }

  export type AppointmentMinAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    date?: true
    duration?: true
    type?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    date?: true
    duration?: true
    type?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    doctorId?: true
    patientId?: true
    date?: true
    duration?: true
    type?: true
    status?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AppointmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AppointmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _avg?: AppointmentAvgAggregateInputType
    _sum?: AppointmentSumAggregateInputType
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    doctorId: string
    patientId: string
    date: Date
    duration: number
    type: string
    status: $Enums.AppointmentStatus
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _avg: AppointmentAvgAggregateOutputType | null
    _sum: AppointmentSumAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    date?: boolean
    duration?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    date?: boolean
    duration?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    date?: boolean
    duration?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>

  export type AppointmentSelectScalar = {
    id?: boolean
    doctorId?: boolean
    patientId?: boolean
    date?: boolean
    duration?: boolean
    type?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "doctorId" | "patientId" | "date" | "duration" | "type" | "status" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AppointmentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    doctor?: boolean | UserDefaultArgs<ExtArgs>
    patient?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      doctor: Prisma.$UserPayload<ExtArgs>
      patient: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      doctorId: string
      patientId: string
      date: Date
      duration: number
      type: string
      status: $Enums.AppointmentStatus
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Appointments and returns the data saved in the database.
     * @param {AppointmentCreateManyAndReturnArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppointmentCreateManyAndReturnArgs>(args?: SelectSubset<T, AppointmentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments and returns the data updated in the database.
     * @param {AppointmentUpdateManyAndReturnArgs} args - Arguments to update many Appointments.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Appointments and only return the `id`
     * const appointmentWithIdOnly = await prisma.appointment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AppointmentUpdateManyAndReturnArgs>(args: SelectSubset<T, AppointmentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    doctor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly doctorId: FieldRef<"Appointment", 'String'>
    readonly patientId: FieldRef<"Appointment", 'String'>
    readonly date: FieldRef<"Appointment", 'DateTime'>
    readonly duration: FieldRef<"Appointment", 'Int'>
    readonly type: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
    readonly updatedAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
  }

  /**
   * Appointment createManyAndReturn
   */
  export type AppointmentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment updateManyAndReturn
   */
  export type AppointmentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    content: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    senderId: string | null
    receiverId: string | null
    content: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    senderId: number
    receiverId: number
    content: number
    read: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    read?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    read?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    senderId?: true
    receiverId?: true
    content?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    senderId: string
    receiverId: string
    content: string
    read: boolean
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    read?: boolean
    createdAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    read?: boolean
    createdAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    read?: boolean
    createdAt?: boolean
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    senderId?: boolean
    receiverId?: boolean
    content?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "senderId" | "receiverId" | "content" | "read" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sender?: boolean | UserDefaultArgs<ExtArgs>
    receiver?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      sender: Prisma.$UserPayload<ExtArgs>
      receiver: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      senderId: string
      receiverId: string
      content: string
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sender<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    receiver<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly senderId: FieldRef<"Message", 'String'>
    readonly receiverId: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly read: FieldRef<"Message", 'Boolean'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model FoodScan
   */

  export type AggregateFoodScan = {
    _count: FoodScanCountAggregateOutputType | null
    _min: FoodScanMinAggregateOutputType | null
    _max: FoodScanMaxAggregateOutputType | null
  }

  export type FoodScanMinAggregateOutputType = {
    id: string | null
    userId: string | null
    productName: string | null
    barcode: string | null
    brand: string | null
    imageUrl: string | null
    ingredients: string | null
    result: $Enums.FoodScanResult | null
    dangerousIngredients: string | null
    recommendation: string | null
    nutriscore: string | null
    createdAt: Date | null
  }

  export type FoodScanMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    productName: string | null
    barcode: string | null
    brand: string | null
    imageUrl: string | null
    ingredients: string | null
    result: $Enums.FoodScanResult | null
    dangerousIngredients: string | null
    recommendation: string | null
    nutriscore: string | null
    createdAt: Date | null
  }

  export type FoodScanCountAggregateOutputType = {
    id: number
    userId: number
    productName: number
    barcode: number
    brand: number
    imageUrl: number
    ingredients: number
    result: number
    dangerousIngredients: number
    recommendation: number
    nutriscore: number
    createdAt: number
    _all: number
  }


  export type FoodScanMinAggregateInputType = {
    id?: true
    userId?: true
    productName?: true
    barcode?: true
    brand?: true
    imageUrl?: true
    ingredients?: true
    result?: true
    dangerousIngredients?: true
    recommendation?: true
    nutriscore?: true
    createdAt?: true
  }

  export type FoodScanMaxAggregateInputType = {
    id?: true
    userId?: true
    productName?: true
    barcode?: true
    brand?: true
    imageUrl?: true
    ingredients?: true
    result?: true
    dangerousIngredients?: true
    recommendation?: true
    nutriscore?: true
    createdAt?: true
  }

  export type FoodScanCountAggregateInputType = {
    id?: true
    userId?: true
    productName?: true
    barcode?: true
    brand?: true
    imageUrl?: true
    ingredients?: true
    result?: true
    dangerousIngredients?: true
    recommendation?: true
    nutriscore?: true
    createdAt?: true
    _all?: true
  }

  export type FoodScanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodScan to aggregate.
     */
    where?: FoodScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodScans to fetch.
     */
    orderBy?: FoodScanOrderByWithRelationInput | FoodScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FoodScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodScans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodScans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FoodScans
    **/
    _count?: true | FoodScanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoodScanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoodScanMaxAggregateInputType
  }

  export type GetFoodScanAggregateType<T extends FoodScanAggregateArgs> = {
        [P in keyof T & keyof AggregateFoodScan]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFoodScan[P]>
      : GetScalarType<T[P], AggregateFoodScan[P]>
  }




  export type FoodScanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FoodScanWhereInput
    orderBy?: FoodScanOrderByWithAggregationInput | FoodScanOrderByWithAggregationInput[]
    by: FoodScanScalarFieldEnum[] | FoodScanScalarFieldEnum
    having?: FoodScanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoodScanCountAggregateInputType | true
    _min?: FoodScanMinAggregateInputType
    _max?: FoodScanMaxAggregateInputType
  }

  export type FoodScanGroupByOutputType = {
    id: string
    userId: string
    productName: string
    barcode: string | null
    brand: string | null
    imageUrl: string | null
    ingredients: string
    result: $Enums.FoodScanResult
    dangerousIngredients: string | null
    recommendation: string
    nutriscore: string | null
    createdAt: Date
    _count: FoodScanCountAggregateOutputType | null
    _min: FoodScanMinAggregateOutputType | null
    _max: FoodScanMaxAggregateOutputType | null
  }

  type GetFoodScanGroupByPayload<T extends FoodScanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoodScanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoodScanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoodScanGroupByOutputType[P]>
            : GetScalarType<T[P], FoodScanGroupByOutputType[P]>
        }
      >
    >


  export type FoodScanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productName?: boolean
    barcode?: boolean
    brand?: boolean
    imageUrl?: boolean
    ingredients?: boolean
    result?: boolean
    dangerousIngredients?: boolean
    recommendation?: boolean
    nutriscore?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodScan"]>

  export type FoodScanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productName?: boolean
    barcode?: boolean
    brand?: boolean
    imageUrl?: boolean
    ingredients?: boolean
    result?: boolean
    dangerousIngredients?: boolean
    recommendation?: boolean
    nutriscore?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodScan"]>

  export type FoodScanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    productName?: boolean
    barcode?: boolean
    brand?: boolean
    imageUrl?: boolean
    ingredients?: boolean
    result?: boolean
    dangerousIngredients?: boolean
    recommendation?: boolean
    nutriscore?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["foodScan"]>

  export type FoodScanSelectScalar = {
    id?: boolean
    userId?: boolean
    productName?: boolean
    barcode?: boolean
    brand?: boolean
    imageUrl?: boolean
    ingredients?: boolean
    result?: boolean
    dangerousIngredients?: boolean
    recommendation?: boolean
    nutriscore?: boolean
    createdAt?: boolean
  }

  export type FoodScanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "productName" | "barcode" | "brand" | "imageUrl" | "ingredients" | "result" | "dangerousIngredients" | "recommendation" | "nutriscore" | "createdAt", ExtArgs["result"]["foodScan"]>
  export type FoodScanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FoodScanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FoodScanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FoodScanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FoodScan"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      productName: string
      barcode: string | null
      brand: string | null
      imageUrl: string | null
      ingredients: string
      result: $Enums.FoodScanResult
      dangerousIngredients: string | null
      recommendation: string
      nutriscore: string | null
      createdAt: Date
    }, ExtArgs["result"]["foodScan"]>
    composites: {}
  }

  type FoodScanGetPayload<S extends boolean | null | undefined | FoodScanDefaultArgs> = $Result.GetResult<Prisma.$FoodScanPayload, S>

  type FoodScanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FoodScanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoodScanCountAggregateInputType | true
    }

  export interface FoodScanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FoodScan'], meta: { name: 'FoodScan' } }
    /**
     * Find zero or one FoodScan that matches the filter.
     * @param {FoodScanFindUniqueArgs} args - Arguments to find a FoodScan
     * @example
     * // Get one FoodScan
     * const foodScan = await prisma.foodScan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FoodScanFindUniqueArgs>(args: SelectSubset<T, FoodScanFindUniqueArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FoodScan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FoodScanFindUniqueOrThrowArgs} args - Arguments to find a FoodScan
     * @example
     * // Get one FoodScan
     * const foodScan = await prisma.foodScan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FoodScanFindUniqueOrThrowArgs>(args: SelectSubset<T, FoodScanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodScan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodScanFindFirstArgs} args - Arguments to find a FoodScan
     * @example
     * // Get one FoodScan
     * const foodScan = await prisma.foodScan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FoodScanFindFirstArgs>(args?: SelectSubset<T, FoodScanFindFirstArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FoodScan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodScanFindFirstOrThrowArgs} args - Arguments to find a FoodScan
     * @example
     * // Get one FoodScan
     * const foodScan = await prisma.foodScan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FoodScanFindFirstOrThrowArgs>(args?: SelectSubset<T, FoodScanFindFirstOrThrowArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FoodScans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodScanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FoodScans
     * const foodScans = await prisma.foodScan.findMany()
     * 
     * // Get first 10 FoodScans
     * const foodScans = await prisma.foodScan.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foodScanWithIdOnly = await prisma.foodScan.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FoodScanFindManyArgs>(args?: SelectSubset<T, FoodScanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FoodScan.
     * @param {FoodScanCreateArgs} args - Arguments to create a FoodScan.
     * @example
     * // Create one FoodScan
     * const FoodScan = await prisma.foodScan.create({
     *   data: {
     *     // ... data to create a FoodScan
     *   }
     * })
     * 
     */
    create<T extends FoodScanCreateArgs>(args: SelectSubset<T, FoodScanCreateArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FoodScans.
     * @param {FoodScanCreateManyArgs} args - Arguments to create many FoodScans.
     * @example
     * // Create many FoodScans
     * const foodScan = await prisma.foodScan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FoodScanCreateManyArgs>(args?: SelectSubset<T, FoodScanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FoodScans and returns the data saved in the database.
     * @param {FoodScanCreateManyAndReturnArgs} args - Arguments to create many FoodScans.
     * @example
     * // Create many FoodScans
     * const foodScan = await prisma.foodScan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FoodScans and only return the `id`
     * const foodScanWithIdOnly = await prisma.foodScan.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FoodScanCreateManyAndReturnArgs>(args?: SelectSubset<T, FoodScanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FoodScan.
     * @param {FoodScanDeleteArgs} args - Arguments to delete one FoodScan.
     * @example
     * // Delete one FoodScan
     * const FoodScan = await prisma.foodScan.delete({
     *   where: {
     *     // ... filter to delete one FoodScan
     *   }
     * })
     * 
     */
    delete<T extends FoodScanDeleteArgs>(args: SelectSubset<T, FoodScanDeleteArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FoodScan.
     * @param {FoodScanUpdateArgs} args - Arguments to update one FoodScan.
     * @example
     * // Update one FoodScan
     * const foodScan = await prisma.foodScan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FoodScanUpdateArgs>(args: SelectSubset<T, FoodScanUpdateArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FoodScans.
     * @param {FoodScanDeleteManyArgs} args - Arguments to filter FoodScans to delete.
     * @example
     * // Delete a few FoodScans
     * const { count } = await prisma.foodScan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FoodScanDeleteManyArgs>(args?: SelectSubset<T, FoodScanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodScans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodScanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FoodScans
     * const foodScan = await prisma.foodScan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FoodScanUpdateManyArgs>(args: SelectSubset<T, FoodScanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FoodScans and returns the data updated in the database.
     * @param {FoodScanUpdateManyAndReturnArgs} args - Arguments to update many FoodScans.
     * @example
     * // Update many FoodScans
     * const foodScan = await prisma.foodScan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FoodScans and only return the `id`
     * const foodScanWithIdOnly = await prisma.foodScan.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FoodScanUpdateManyAndReturnArgs>(args: SelectSubset<T, FoodScanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FoodScan.
     * @param {FoodScanUpsertArgs} args - Arguments to update or create a FoodScan.
     * @example
     * // Update or create a FoodScan
     * const foodScan = await prisma.foodScan.upsert({
     *   create: {
     *     // ... data to create a FoodScan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FoodScan we want to update
     *   }
     * })
     */
    upsert<T extends FoodScanUpsertArgs>(args: SelectSubset<T, FoodScanUpsertArgs<ExtArgs>>): Prisma__FoodScanClient<$Result.GetResult<Prisma.$FoodScanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FoodScans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodScanCountArgs} args - Arguments to filter FoodScans to count.
     * @example
     * // Count the number of FoodScans
     * const count = await prisma.foodScan.count({
     *   where: {
     *     // ... the filter for the FoodScans we want to count
     *   }
     * })
    **/
    count<T extends FoodScanCountArgs>(
      args?: Subset<T, FoodScanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoodScanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FoodScan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodScanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoodScanAggregateArgs>(args: Subset<T, FoodScanAggregateArgs>): Prisma.PrismaPromise<GetFoodScanAggregateType<T>>

    /**
     * Group by FoodScan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoodScanGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FoodScanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FoodScanGroupByArgs['orderBy'] }
        : { orderBy?: FoodScanGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FoodScanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoodScanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FoodScan model
   */
  readonly fields: FoodScanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FoodScan.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FoodScanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FoodScan model
   */
  interface FoodScanFieldRefs {
    readonly id: FieldRef<"FoodScan", 'String'>
    readonly userId: FieldRef<"FoodScan", 'String'>
    readonly productName: FieldRef<"FoodScan", 'String'>
    readonly barcode: FieldRef<"FoodScan", 'String'>
    readonly brand: FieldRef<"FoodScan", 'String'>
    readonly imageUrl: FieldRef<"FoodScan", 'String'>
    readonly ingredients: FieldRef<"FoodScan", 'String'>
    readonly result: FieldRef<"FoodScan", 'FoodScanResult'>
    readonly dangerousIngredients: FieldRef<"FoodScan", 'String'>
    readonly recommendation: FieldRef<"FoodScan", 'String'>
    readonly nutriscore: FieldRef<"FoodScan", 'String'>
    readonly createdAt: FieldRef<"FoodScan", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FoodScan findUnique
   */
  export type FoodScanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * Filter, which FoodScan to fetch.
     */
    where: FoodScanWhereUniqueInput
  }

  /**
   * FoodScan findUniqueOrThrow
   */
  export type FoodScanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * Filter, which FoodScan to fetch.
     */
    where: FoodScanWhereUniqueInput
  }

  /**
   * FoodScan findFirst
   */
  export type FoodScanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * Filter, which FoodScan to fetch.
     */
    where?: FoodScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodScans to fetch.
     */
    orderBy?: FoodScanOrderByWithRelationInput | FoodScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodScans.
     */
    cursor?: FoodScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodScans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodScans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodScans.
     */
    distinct?: FoodScanScalarFieldEnum | FoodScanScalarFieldEnum[]
  }

  /**
   * FoodScan findFirstOrThrow
   */
  export type FoodScanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * Filter, which FoodScan to fetch.
     */
    where?: FoodScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodScans to fetch.
     */
    orderBy?: FoodScanOrderByWithRelationInput | FoodScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FoodScans.
     */
    cursor?: FoodScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodScans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodScans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FoodScans.
     */
    distinct?: FoodScanScalarFieldEnum | FoodScanScalarFieldEnum[]
  }

  /**
   * FoodScan findMany
   */
  export type FoodScanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * Filter, which FoodScans to fetch.
     */
    where?: FoodScanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FoodScans to fetch.
     */
    orderBy?: FoodScanOrderByWithRelationInput | FoodScanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FoodScans.
     */
    cursor?: FoodScanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FoodScans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FoodScans.
     */
    skip?: number
    distinct?: FoodScanScalarFieldEnum | FoodScanScalarFieldEnum[]
  }

  /**
   * FoodScan create
   */
  export type FoodScanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * The data needed to create a FoodScan.
     */
    data: XOR<FoodScanCreateInput, FoodScanUncheckedCreateInput>
  }

  /**
   * FoodScan createMany
   */
  export type FoodScanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FoodScans.
     */
    data: FoodScanCreateManyInput | FoodScanCreateManyInput[]
  }

  /**
   * FoodScan createManyAndReturn
   */
  export type FoodScanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * The data used to create many FoodScans.
     */
    data: FoodScanCreateManyInput | FoodScanCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FoodScan update
   */
  export type FoodScanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * The data needed to update a FoodScan.
     */
    data: XOR<FoodScanUpdateInput, FoodScanUncheckedUpdateInput>
    /**
     * Choose, which FoodScan to update.
     */
    where: FoodScanWhereUniqueInput
  }

  /**
   * FoodScan updateMany
   */
  export type FoodScanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FoodScans.
     */
    data: XOR<FoodScanUpdateManyMutationInput, FoodScanUncheckedUpdateManyInput>
    /**
     * Filter which FoodScans to update
     */
    where?: FoodScanWhereInput
    /**
     * Limit how many FoodScans to update.
     */
    limit?: number
  }

  /**
   * FoodScan updateManyAndReturn
   */
  export type FoodScanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * The data used to update FoodScans.
     */
    data: XOR<FoodScanUpdateManyMutationInput, FoodScanUncheckedUpdateManyInput>
    /**
     * Filter which FoodScans to update
     */
    where?: FoodScanWhereInput
    /**
     * Limit how many FoodScans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FoodScan upsert
   */
  export type FoodScanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * The filter to search for the FoodScan to update in case it exists.
     */
    where: FoodScanWhereUniqueInput
    /**
     * In case the FoodScan found by the `where` argument doesn't exist, create a new FoodScan with this data.
     */
    create: XOR<FoodScanCreateInput, FoodScanUncheckedCreateInput>
    /**
     * In case the FoodScan was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FoodScanUpdateInput, FoodScanUncheckedUpdateInput>
  }

  /**
   * FoodScan delete
   */
  export type FoodScanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
    /**
     * Filter which FoodScan to delete.
     */
    where: FoodScanWhereUniqueInput
  }

  /**
   * FoodScan deleteMany
   */
  export type FoodScanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FoodScans to delete
     */
    where?: FoodScanWhereInput
    /**
     * Limit how many FoodScans to delete.
     */
    limit?: number
  }

  /**
   * FoodScan without action
   */
  export type FoodScanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoodScan
     */
    select?: FoodScanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FoodScan
     */
    omit?: FoodScanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FoodScanInclude<ExtArgs> | null
  }


  /**
   * Model Report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    subject: string | null
    message: string | null
    productName: string | null
    barcode: string | null
    imageUrl: string | null
    status: $Enums.ReportStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    subject: string | null
    message: string | null
    productName: string | null
    barcode: string | null
    imageUrl: string | null
    status: $Enums.ReportStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    subject: number
    message: number
    productName: number
    barcode: number
    imageUrl: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    subject?: true
    message?: true
    productName?: true
    barcode?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    subject?: true
    message?: true
    productName?: true
    barcode?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    subject?: true
    message?: true
    productName?: true
    barcode?: true
    imageUrl?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
    orderBy?: ReportOrderByWithAggregationInput | ReportOrderByWithAggregationInput[]
    by: ReportScalarFieldEnum[] | ReportScalarFieldEnum
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }

  export type ReportGroupByOutputType = {
    id: string
    userId: string
    type: string
    subject: string
    message: string
    productName: string | null
    barcode: string | null
    imageUrl: string | null
    status: $Enums.ReportStatus
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type ReportSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    subject?: boolean
    message?: boolean
    productName?: boolean
    barcode?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    subject?: boolean
    message?: boolean
    productName?: boolean
    barcode?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    subject?: boolean
    message?: boolean
    productName?: boolean
    barcode?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    subject?: boolean
    message?: boolean
    productName?: boolean
    barcode?: boolean
    imageUrl?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ReportOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "subject" | "message" | "productName" | "barcode" | "imageUrl" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["report"]>
  export type ReportInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReportIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ReportIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ReportPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Report"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      subject: string
      message: string
      productName: string | null
      barcode: string | null
      imageUrl: string | null
      status: $Enums.ReportStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["report"]>
    composites: {}
  }

  type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = $Result.GetResult<Prisma.$ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReportFindUniqueArgs>(args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Report that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReportFindFirstArgs>(args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Report that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReportFindManyArgs>(args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
     */
    create<T extends ReportCreateArgs>(args: SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reports.
     * @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReportCreateManyArgs>(args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reports and returns the data saved in the database.
     * @param {ReportCreateManyAndReturnArgs} args - Arguments to create many Reports.
     * @example
     * // Create many Reports
     * const report = await prisma.report.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
     */
    delete<T extends ReportDeleteArgs>(args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReportUpdateArgs>(args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReportDeleteManyArgs>(args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReportUpdateManyArgs>(args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports and returns the data updated in the database.
     * @param {ReportUpdateManyAndReturnArgs} args - Arguments to update many Reports.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reports and only return the `id`
     * const reportWithIdOnly = await prisma.report.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
     */
    upsert<T extends ReportUpsertArgs>(args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma__ReportClient<$Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Report model
   */
  readonly fields: ReportFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Report model
   */
  interface ReportFieldRefs {
    readonly id: FieldRef<"Report", 'String'>
    readonly userId: FieldRef<"Report", 'String'>
    readonly type: FieldRef<"Report", 'String'>
    readonly subject: FieldRef<"Report", 'String'>
    readonly message: FieldRef<"Report", 'String'>
    readonly productName: FieldRef<"Report", 'String'>
    readonly barcode: FieldRef<"Report", 'String'>
    readonly imageUrl: FieldRef<"Report", 'String'>
    readonly status: FieldRef<"Report", 'ReportStatus'>
    readonly createdAt: FieldRef<"Report", 'DateTime'>
    readonly updatedAt: FieldRef<"Report", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Report findUnique
   */
  export type ReportFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findFirst
   */
  export type ReportFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: ReportOrderByWithRelationInput | ReportOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: ReportScalarFieldEnum | ReportScalarFieldEnum[]
  }

  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }

  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
  }

  /**
   * Report createManyAndReturn
   */
  export type ReportCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to create many Reports.
     */
    data: ReportCreateManyInput | ReportCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
  }

  /**
   * Report updateManyAndReturn
   */
  export type ReportUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }

  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
    /**
     * Limit how many Reports to delete.
     */
    limit?: number
  }

  /**
   * Report without action
   */
  export type ReportDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Report
     */
    omit?: ReportOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReportInclude<ExtArgs> | null
  }


  /**
   * Model Notification
   */

  export type AggregateNotification = {
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  export type NotificationMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    link: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    message: string | null
    type: string | null
    link: string | null
    read: boolean | null
    createdAt: Date | null
  }

  export type NotificationCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    message: number
    type: number
    link: number
    read: number
    createdAt: number
    _all: number
  }


  export type NotificationMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    read?: true
    createdAt?: true
  }

  export type NotificationMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    read?: true
    createdAt?: true
  }

  export type NotificationCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    message?: true
    type?: true
    link?: true
    read?: true
    createdAt?: true
    _all?: true
  }

  export type NotificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notification to aggregate.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notifications
    **/
    _count?: true | NotificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotificationMaxAggregateInputType
  }

  export type GetNotificationAggregateType<T extends NotificationAggregateArgs> = {
        [P in keyof T & keyof AggregateNotification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotification[P]>
      : GetScalarType<T[P], AggregateNotification[P]>
  }




  export type NotificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NotificationWhereInput
    orderBy?: NotificationOrderByWithAggregationInput | NotificationOrderByWithAggregationInput[]
    by: NotificationScalarFieldEnum[] | NotificationScalarFieldEnum
    having?: NotificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotificationCountAggregateInputType | true
    _min?: NotificationMinAggregateInputType
    _max?: NotificationMaxAggregateInputType
  }

  export type NotificationGroupByOutputType = {
    id: string
    userId: string
    title: string
    message: string
    type: string
    link: string | null
    read: boolean
    createdAt: Date
    _count: NotificationCountAggregateOutputType | null
    _min: NotificationMinAggregateOutputType | null
    _max: NotificationMaxAggregateOutputType | null
  }

  type GetNotificationGroupByPayload<T extends NotificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotificationGroupByOutputType[P]>
            : GetScalarType<T[P], NotificationGroupByOutputType[P]>
        }
      >
    >


  export type NotificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    read?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notification"]>

  export type NotificationSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    message?: boolean
    type?: boolean
    link?: boolean
    read?: boolean
    createdAt?: boolean
  }

  export type NotificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "message" | "type" | "link" | "read" | "createdAt", ExtArgs["result"]["notification"]>
  export type NotificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type NotificationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NotificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notification"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      title: string
      message: string
      type: string
      link: string | null
      read: boolean
      createdAt: Date
    }, ExtArgs["result"]["notification"]>
    composites: {}
  }

  type NotificationGetPayload<S extends boolean | null | undefined | NotificationDefaultArgs> = $Result.GetResult<Prisma.$NotificationPayload, S>

  type NotificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NotificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotificationCountAggregateInputType | true
    }

  export interface NotificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notification'], meta: { name: 'Notification' } }
    /**
     * Find zero or one Notification that matches the filter.
     * @param {NotificationFindUniqueArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NotificationFindUniqueArgs>(args: SelectSubset<T, NotificationFindUniqueArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NotificationFindUniqueOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NotificationFindUniqueOrThrowArgs>(args: SelectSubset<T, NotificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NotificationFindFirstArgs>(args?: SelectSubset<T, NotificationFindFirstArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindFirstOrThrowArgs} args - Arguments to find a Notification
     * @example
     * // Get one Notification
     * const notification = await prisma.notification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NotificationFindFirstOrThrowArgs>(args?: SelectSubset<T, NotificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notifications
     * const notifications = await prisma.notification.findMany()
     * 
     * // Get first 10 Notifications
     * const notifications = await prisma.notification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notificationWithIdOnly = await prisma.notification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NotificationFindManyArgs>(args?: SelectSubset<T, NotificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notification.
     * @param {NotificationCreateArgs} args - Arguments to create a Notification.
     * @example
     * // Create one Notification
     * const Notification = await prisma.notification.create({
     *   data: {
     *     // ... data to create a Notification
     *   }
     * })
     * 
     */
    create<T extends NotificationCreateArgs>(args: SelectSubset<T, NotificationCreateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notifications.
     * @param {NotificationCreateManyArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NotificationCreateManyArgs>(args?: SelectSubset<T, NotificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notifications and returns the data saved in the database.
     * @param {NotificationCreateManyAndReturnArgs} args - Arguments to create many Notifications.
     * @example
     * // Create many Notifications
     * const notification = await prisma.notification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NotificationCreateManyAndReturnArgs>(args?: SelectSubset<T, NotificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Notification.
     * @param {NotificationDeleteArgs} args - Arguments to delete one Notification.
     * @example
     * // Delete one Notification
     * const Notification = await prisma.notification.delete({
     *   where: {
     *     // ... filter to delete one Notification
     *   }
     * })
     * 
     */
    delete<T extends NotificationDeleteArgs>(args: SelectSubset<T, NotificationDeleteArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notification.
     * @param {NotificationUpdateArgs} args - Arguments to update one Notification.
     * @example
     * // Update one Notification
     * const notification = await prisma.notification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NotificationUpdateArgs>(args: SelectSubset<T, NotificationUpdateArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notifications.
     * @param {NotificationDeleteManyArgs} args - Arguments to filter Notifications to delete.
     * @example
     * // Delete a few Notifications
     * const { count } = await prisma.notification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NotificationDeleteManyArgs>(args?: SelectSubset<T, NotificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NotificationUpdateManyArgs>(args: SelectSubset<T, NotificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notifications and returns the data updated in the database.
     * @param {NotificationUpdateManyAndReturnArgs} args - Arguments to update many Notifications.
     * @example
     * // Update many Notifications
     * const notification = await prisma.notification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Notifications and only return the `id`
     * const notificationWithIdOnly = await prisma.notification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NotificationUpdateManyAndReturnArgs>(args: SelectSubset<T, NotificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Notification.
     * @param {NotificationUpsertArgs} args - Arguments to update or create a Notification.
     * @example
     * // Update or create a Notification
     * const notification = await prisma.notification.upsert({
     *   create: {
     *     // ... data to create a Notification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notification we want to update
     *   }
     * })
     */
    upsert<T extends NotificationUpsertArgs>(args: SelectSubset<T, NotificationUpsertArgs<ExtArgs>>): Prisma__NotificationClient<$Result.GetResult<Prisma.$NotificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationCountArgs} args - Arguments to filter Notifications to count.
     * @example
     * // Count the number of Notifications
     * const count = await prisma.notification.count({
     *   where: {
     *     // ... the filter for the Notifications we want to count
     *   }
     * })
    **/
    count<T extends NotificationCountArgs>(
      args?: Subset<T, NotificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotificationAggregateArgs>(args: Subset<T, NotificationAggregateArgs>): Prisma.PrismaPromise<GetNotificationAggregateType<T>>

    /**
     * Group by Notification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NotificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NotificationGroupByArgs['orderBy'] }
        : { orderBy?: NotificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NotificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notification model
   */
  readonly fields: NotificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NotificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notification model
   */
  interface NotificationFieldRefs {
    readonly id: FieldRef<"Notification", 'String'>
    readonly userId: FieldRef<"Notification", 'String'>
    readonly title: FieldRef<"Notification", 'String'>
    readonly message: FieldRef<"Notification", 'String'>
    readonly type: FieldRef<"Notification", 'String'>
    readonly link: FieldRef<"Notification", 'String'>
    readonly read: FieldRef<"Notification", 'Boolean'>
    readonly createdAt: FieldRef<"Notification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notification findUnique
   */
  export type NotificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findUniqueOrThrow
   */
  export type NotificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification findFirst
   */
  export type NotificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findFirstOrThrow
   */
  export type NotificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notification to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notifications.
     */
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification findMany
   */
  export type NotificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter, which Notifications to fetch.
     */
    where?: NotificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notifications to fetch.
     */
    orderBy?: NotificationOrderByWithRelationInput | NotificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notifications.
     */
    cursor?: NotificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notifications.
     */
    skip?: number
    distinct?: NotificationScalarFieldEnum | NotificationScalarFieldEnum[]
  }

  /**
   * Notification create
   */
  export type NotificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Notification.
     */
    data: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
  }

  /**
   * Notification createMany
   */
  export type NotificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
  }

  /**
   * Notification createManyAndReturn
   */
  export type NotificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to create many Notifications.
     */
    data: NotificationCreateManyInput | NotificationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification update
   */
  export type NotificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Notification.
     */
    data: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
    /**
     * Choose, which Notification to update.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification updateMany
   */
  export type NotificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
  }

  /**
   * Notification updateManyAndReturn
   */
  export type NotificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * The data used to update Notifications.
     */
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyInput>
    /**
     * Filter which Notifications to update
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Notification upsert
   */
  export type NotificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Notification to update in case it exists.
     */
    where: NotificationWhereUniqueInput
    /**
     * In case the Notification found by the `where` argument doesn't exist, create a new Notification with this data.
     */
    create: XOR<NotificationCreateInput, NotificationUncheckedCreateInput>
    /**
     * In case the Notification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NotificationUpdateInput, NotificationUncheckedUpdateInput>
  }

  /**
   * Notification delete
   */
  export type NotificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
    /**
     * Filter which Notification to delete.
     */
    where: NotificationWhereUniqueInput
  }

  /**
   * Notification deleteMany
   */
  export type NotificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notifications to delete
     */
    where?: NotificationWhereInput
    /**
     * Limit how many Notifications to delete.
     */
    limit?: number
  }

  /**
   * Notification without action
   */
  export type NotificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notification
     */
    select?: NotificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Notification
     */
    omit?: NotificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NotificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    role: 'role',
    firstName: 'firstName',
    lastName: 'lastName',
    phone: 'phone',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DoctorProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    specialty: 'specialty',
    licenseNumber: 'licenseNumber',
    clinicAddress: 'clinicAddress',
    bio: 'bio',
    consultationFee: 'consultationFee',
    gender: 'gender',
    yearsOfExperience: 'yearsOfExperience',
    spokenLanguages: 'spokenLanguages',
    city: 'city',
    country: 'country',
    consultationMode: 'consultationMode',
    linkedin: 'linkedin',
    whatsapp: 'whatsapp',
    telegram: 'telegram',
    googleMapsLink: 'googleMapsLink',
    subscriptionStatus: 'subscriptionStatus',
    subscriptionStart: 'subscriptionStart',
    subscriptionEnd: 'subscriptionEnd',
    availability: 'availability',
    latitude: 'latitude',
    longitude: 'longitude',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DoctorProfileScalarFieldEnum = (typeof DoctorProfileScalarFieldEnum)[keyof typeof DoctorProfileScalarFieldEnum]


  export const HealthProfileScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    birthDate: 'birthDate',
    gender: 'gender',
    height: 'height',
    weight: 'weight',
    bloodType: 'bloodType',
    diet: 'diet',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type HealthProfileScalarFieldEnum = (typeof HealthProfileScalarFieldEnum)[keyof typeof HealthProfileScalarFieldEnum]


  export const DoctorPatientScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    patientId: 'patientId',
    status: 'status',
    notes: 'notes',
    diseases: 'diseases',
    allergies: 'allergies',
    medications: 'medications',
    medicalHistory: 'medicalHistory',
    familyHistory: 'familyHistory',
    surgeryHistory: 'surgeryHistory',
    bloodPressure: 'bloodPressure',
    heartRate: 'heartRate',
    temperature: 'temperature',
    symptoms: 'symptoms',
    diagnosis: 'diagnosis',
    treatmentPlan: 'treatmentPlan',
    examsRequested: 'examsRequested',
    observation: 'observation',
    recommendations: 'recommendations',
    documents: 'documents',
    nextConsultation: 'nextConsultation',
    consultationReason: 'consultationReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DoctorPatientScalarFieldEnum = (typeof DoctorPatientScalarFieldEnum)[keyof typeof DoctorPatientScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    doctorId: 'doctorId',
    patientId: 'patientId',
    date: 'date',
    duration: 'duration',
    type: 'type',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    senderId: 'senderId',
    receiverId: 'receiverId',
    content: 'content',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const FoodScanScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    productName: 'productName',
    barcode: 'barcode',
    brand: 'brand',
    imageUrl: 'imageUrl',
    ingredients: 'ingredients',
    result: 'result',
    dangerousIngredients: 'dangerousIngredients',
    recommendation: 'recommendation',
    nutriscore: 'nutriscore',
    createdAt: 'createdAt'
  };

  export type FoodScanScalarFieldEnum = (typeof FoodScanScalarFieldEnum)[keyof typeof FoodScanScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    subject: 'subject',
    message: 'message',
    productName: 'productName',
    barcode: 'barcode',
    imageUrl: 'imageUrl',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const NotificationScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    message: 'message',
    type: 'type',
    link: 'link',
    read: 'read',
    createdAt: 'createdAt'
  };

  export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'SubscriptionStatus'
   */
  export type EnumSubscriptionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SubscriptionStatus'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'FoodScanResult'
   */
  export type EnumFoodScanResultFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FoodScanResult'>
    


  /**
   * Reference to a field of type 'ReportStatus'
   */
  export type EnumReportStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReportStatus'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    doctorProfile?: XOR<DoctorProfileNullableScalarRelationFilter, DoctorProfileWhereInput> | null
    healthProfile?: XOR<HealthProfileNullableScalarRelationFilter, HealthProfileWhereInput> | null
    sentMessages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
    foodScans?: FoodScanListRelationFilter
    reports?: ReportListRelationFilter
    doctorAppointments?: AppointmentListRelationFilter
    patientAppointments?: AppointmentListRelationFilter
    doctorPatients?: DoctorPatientListRelationFilter
    patientDoctors?: DoctorPatientListRelationFilter
    notifications?: NotificationListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctorProfile?: DoctorProfileOrderByWithRelationInput
    healthProfile?: HealthProfileOrderByWithRelationInput
    sentMessages?: MessageOrderByRelationAggregateInput
    receivedMessages?: MessageOrderByRelationAggregateInput
    foodScans?: FoodScanOrderByRelationAggregateInput
    reports?: ReportOrderByRelationAggregateInput
    doctorAppointments?: AppointmentOrderByRelationAggregateInput
    patientAppointments?: AppointmentOrderByRelationAggregateInput
    doctorPatients?: DoctorPatientOrderByRelationAggregateInput
    patientDoctors?: DoctorPatientOrderByRelationAggregateInput
    notifications?: NotificationOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    doctorProfile?: XOR<DoctorProfileNullableScalarRelationFilter, DoctorProfileWhereInput> | null
    healthProfile?: XOR<HealthProfileNullableScalarRelationFilter, HealthProfileWhereInput> | null
    sentMessages?: MessageListRelationFilter
    receivedMessages?: MessageListRelationFilter
    foodScans?: FoodScanListRelationFilter
    reports?: ReportListRelationFilter
    doctorAppointments?: AppointmentListRelationFilter
    patientAppointments?: AppointmentListRelationFilter
    doctorPatients?: DoctorPatientListRelationFilter
    patientDoctors?: DoctorPatientListRelationFilter
    notifications?: NotificationListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DoctorProfileWhereInput = {
    AND?: DoctorProfileWhereInput | DoctorProfileWhereInput[]
    OR?: DoctorProfileWhereInput[]
    NOT?: DoctorProfileWhereInput | DoctorProfileWhereInput[]
    id?: StringFilter<"DoctorProfile"> | string
    userId?: StringFilter<"DoctorProfile"> | string
    specialty?: StringFilter<"DoctorProfile"> | string
    licenseNumber?: StringFilter<"DoctorProfile"> | string
    clinicAddress?: StringFilter<"DoctorProfile"> | string
    bio?: StringNullableFilter<"DoctorProfile"> | string | null
    consultationFee?: FloatNullableFilter<"DoctorProfile"> | number | null
    gender?: StringNullableFilter<"DoctorProfile"> | string | null
    yearsOfExperience?: IntNullableFilter<"DoctorProfile"> | number | null
    spokenLanguages?: StringNullableFilter<"DoctorProfile"> | string | null
    city?: StringNullableFilter<"DoctorProfile"> | string | null
    country?: StringNullableFilter<"DoctorProfile"> | string | null
    consultationMode?: StringNullableFilter<"DoctorProfile"> | string | null
    linkedin?: StringNullableFilter<"DoctorProfile"> | string | null
    whatsapp?: StringNullableFilter<"DoctorProfile"> | string | null
    telegram?: StringNullableFilter<"DoctorProfile"> | string | null
    googleMapsLink?: StringNullableFilter<"DoctorProfile"> | string | null
    subscriptionStatus?: EnumSubscriptionStatusFilter<"DoctorProfile"> | $Enums.SubscriptionStatus
    subscriptionStart?: DateTimeNullableFilter<"DoctorProfile"> | Date | string | null
    subscriptionEnd?: DateTimeNullableFilter<"DoctorProfile"> | Date | string | null
    availability?: StringNullableFilter<"DoctorProfile"> | string | null
    latitude?: FloatNullableFilter<"DoctorProfile"> | number | null
    longitude?: FloatNullableFilter<"DoctorProfile"> | number | null
    createdAt?: DateTimeFilter<"DoctorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DoctorProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    clinicAddress?: SortOrder
    bio?: SortOrderInput | SortOrder
    consultationFee?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    spokenLanguages?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    consultationMode?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    googleMapsLink?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrder
    subscriptionStart?: SortOrderInput | SortOrder
    subscriptionEnd?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type DoctorProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    licenseNumber?: string
    AND?: DoctorProfileWhereInput | DoctorProfileWhereInput[]
    OR?: DoctorProfileWhereInput[]
    NOT?: DoctorProfileWhereInput | DoctorProfileWhereInput[]
    specialty?: StringFilter<"DoctorProfile"> | string
    clinicAddress?: StringFilter<"DoctorProfile"> | string
    bio?: StringNullableFilter<"DoctorProfile"> | string | null
    consultationFee?: FloatNullableFilter<"DoctorProfile"> | number | null
    gender?: StringNullableFilter<"DoctorProfile"> | string | null
    yearsOfExperience?: IntNullableFilter<"DoctorProfile"> | number | null
    spokenLanguages?: StringNullableFilter<"DoctorProfile"> | string | null
    city?: StringNullableFilter<"DoctorProfile"> | string | null
    country?: StringNullableFilter<"DoctorProfile"> | string | null
    consultationMode?: StringNullableFilter<"DoctorProfile"> | string | null
    linkedin?: StringNullableFilter<"DoctorProfile"> | string | null
    whatsapp?: StringNullableFilter<"DoctorProfile"> | string | null
    telegram?: StringNullableFilter<"DoctorProfile"> | string | null
    googleMapsLink?: StringNullableFilter<"DoctorProfile"> | string | null
    subscriptionStatus?: EnumSubscriptionStatusFilter<"DoctorProfile"> | $Enums.SubscriptionStatus
    subscriptionStart?: DateTimeNullableFilter<"DoctorProfile"> | Date | string | null
    subscriptionEnd?: DateTimeNullableFilter<"DoctorProfile"> | Date | string | null
    availability?: StringNullableFilter<"DoctorProfile"> | string | null
    latitude?: FloatNullableFilter<"DoctorProfile"> | number | null
    longitude?: FloatNullableFilter<"DoctorProfile"> | number | null
    createdAt?: DateTimeFilter<"DoctorProfile"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId" | "licenseNumber">

  export type DoctorProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    clinicAddress?: SortOrder
    bio?: SortOrderInput | SortOrder
    consultationFee?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    yearsOfExperience?: SortOrderInput | SortOrder
    spokenLanguages?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    consultationMode?: SortOrderInput | SortOrder
    linkedin?: SortOrderInput | SortOrder
    whatsapp?: SortOrderInput | SortOrder
    telegram?: SortOrderInput | SortOrder
    googleMapsLink?: SortOrderInput | SortOrder
    subscriptionStatus?: SortOrder
    subscriptionStart?: SortOrderInput | SortOrder
    subscriptionEnd?: SortOrderInput | SortOrder
    availability?: SortOrderInput | SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DoctorProfileCountOrderByAggregateInput
    _avg?: DoctorProfileAvgOrderByAggregateInput
    _max?: DoctorProfileMaxOrderByAggregateInput
    _min?: DoctorProfileMinOrderByAggregateInput
    _sum?: DoctorProfileSumOrderByAggregateInput
  }

  export type DoctorProfileScalarWhereWithAggregatesInput = {
    AND?: DoctorProfileScalarWhereWithAggregatesInput | DoctorProfileScalarWhereWithAggregatesInput[]
    OR?: DoctorProfileScalarWhereWithAggregatesInput[]
    NOT?: DoctorProfileScalarWhereWithAggregatesInput | DoctorProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DoctorProfile"> | string
    userId?: StringWithAggregatesFilter<"DoctorProfile"> | string
    specialty?: StringWithAggregatesFilter<"DoctorProfile"> | string
    licenseNumber?: StringWithAggregatesFilter<"DoctorProfile"> | string
    clinicAddress?: StringWithAggregatesFilter<"DoctorProfile"> | string
    bio?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    consultationFee?: FloatNullableWithAggregatesFilter<"DoctorProfile"> | number | null
    gender?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    yearsOfExperience?: IntNullableWithAggregatesFilter<"DoctorProfile"> | number | null
    spokenLanguages?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    city?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    country?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    consultationMode?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    linkedin?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    whatsapp?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    telegram?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    googleMapsLink?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    subscriptionStatus?: EnumSubscriptionStatusWithAggregatesFilter<"DoctorProfile"> | $Enums.SubscriptionStatus
    subscriptionStart?: DateTimeNullableWithAggregatesFilter<"DoctorProfile"> | Date | string | null
    subscriptionEnd?: DateTimeNullableWithAggregatesFilter<"DoctorProfile"> | Date | string | null
    availability?: StringNullableWithAggregatesFilter<"DoctorProfile"> | string | null
    latitude?: FloatNullableWithAggregatesFilter<"DoctorProfile"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"DoctorProfile"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"DoctorProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DoctorProfile"> | Date | string
  }

  export type HealthProfileWhereInput = {
    AND?: HealthProfileWhereInput | HealthProfileWhereInput[]
    OR?: HealthProfileWhereInput[]
    NOT?: HealthProfileWhereInput | HealthProfileWhereInput[]
    id?: StringFilter<"HealthProfile"> | string
    userId?: StringFilter<"HealthProfile"> | string
    birthDate?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    gender?: StringNullableFilter<"HealthProfile"> | string | null
    height?: FloatNullableFilter<"HealthProfile"> | number | null
    weight?: FloatNullableFilter<"HealthProfile"> | number | null
    bloodType?: StringNullableFilter<"HealthProfile"> | string | null
    diet?: StringNullableFilter<"HealthProfile"> | string | null
    createdAt?: DateTimeFilter<"HealthProfile"> | Date | string
    updatedAt?: DateTimeFilter<"HealthProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type HealthProfileOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    bloodType?: SortOrderInput | SortOrder
    diet?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type HealthProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: HealthProfileWhereInput | HealthProfileWhereInput[]
    OR?: HealthProfileWhereInput[]
    NOT?: HealthProfileWhereInput | HealthProfileWhereInput[]
    birthDate?: DateTimeNullableFilter<"HealthProfile"> | Date | string | null
    gender?: StringNullableFilter<"HealthProfile"> | string | null
    height?: FloatNullableFilter<"HealthProfile"> | number | null
    weight?: FloatNullableFilter<"HealthProfile"> | number | null
    bloodType?: StringNullableFilter<"HealthProfile"> | string | null
    diet?: StringNullableFilter<"HealthProfile"> | string | null
    createdAt?: DateTimeFilter<"HealthProfile"> | Date | string
    updatedAt?: DateTimeFilter<"HealthProfile"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type HealthProfileOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    birthDate?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    height?: SortOrderInput | SortOrder
    weight?: SortOrderInput | SortOrder
    bloodType?: SortOrderInput | SortOrder
    diet?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: HealthProfileCountOrderByAggregateInput
    _avg?: HealthProfileAvgOrderByAggregateInput
    _max?: HealthProfileMaxOrderByAggregateInput
    _min?: HealthProfileMinOrderByAggregateInput
    _sum?: HealthProfileSumOrderByAggregateInput
  }

  export type HealthProfileScalarWhereWithAggregatesInput = {
    AND?: HealthProfileScalarWhereWithAggregatesInput | HealthProfileScalarWhereWithAggregatesInput[]
    OR?: HealthProfileScalarWhereWithAggregatesInput[]
    NOT?: HealthProfileScalarWhereWithAggregatesInput | HealthProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HealthProfile"> | string
    userId?: StringWithAggregatesFilter<"HealthProfile"> | string
    birthDate?: DateTimeNullableWithAggregatesFilter<"HealthProfile"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    height?: FloatNullableWithAggregatesFilter<"HealthProfile"> | number | null
    weight?: FloatNullableWithAggregatesFilter<"HealthProfile"> | number | null
    bloodType?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    diet?: StringNullableWithAggregatesFilter<"HealthProfile"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"HealthProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"HealthProfile"> | Date | string
  }

  export type DoctorPatientWhereInput = {
    AND?: DoctorPatientWhereInput | DoctorPatientWhereInput[]
    OR?: DoctorPatientWhereInput[]
    NOT?: DoctorPatientWhereInput | DoctorPatientWhereInput[]
    id?: StringFilter<"DoctorPatient"> | string
    doctorId?: StringFilter<"DoctorPatient"> | string
    patientId?: StringFilter<"DoctorPatient"> | string
    status?: StringFilter<"DoctorPatient"> | string
    notes?: StringNullableFilter<"DoctorPatient"> | string | null
    diseases?: StringNullableFilter<"DoctorPatient"> | string | null
    allergies?: StringNullableFilter<"DoctorPatient"> | string | null
    medications?: StringNullableFilter<"DoctorPatient"> | string | null
    medicalHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    familyHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    surgeryHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    bloodPressure?: StringNullableFilter<"DoctorPatient"> | string | null
    heartRate?: IntNullableFilter<"DoctorPatient"> | number | null
    temperature?: FloatNullableFilter<"DoctorPatient"> | number | null
    symptoms?: StringNullableFilter<"DoctorPatient"> | string | null
    diagnosis?: StringNullableFilter<"DoctorPatient"> | string | null
    treatmentPlan?: StringNullableFilter<"DoctorPatient"> | string | null
    examsRequested?: StringNullableFilter<"DoctorPatient"> | string | null
    observation?: StringNullableFilter<"DoctorPatient"> | string | null
    recommendations?: StringNullableFilter<"DoctorPatient"> | string | null
    documents?: StringNullableFilter<"DoctorPatient"> | string | null
    nextConsultation?: DateTimeNullableFilter<"DoctorPatient"> | Date | string | null
    consultationReason?: StringNullableFilter<"DoctorPatient"> | string | null
    createdAt?: DateTimeFilter<"DoctorPatient"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorPatient"> | Date | string
    doctor?: XOR<UserScalarRelationFilter, UserWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type DoctorPatientOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    diseases?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    medicalHistory?: SortOrderInput | SortOrder
    familyHistory?: SortOrderInput | SortOrder
    surgeryHistory?: SortOrderInput | SortOrder
    bloodPressure?: SortOrderInput | SortOrder
    heartRate?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    symptoms?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    treatmentPlan?: SortOrderInput | SortOrder
    examsRequested?: SortOrderInput | SortOrder
    observation?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    documents?: SortOrderInput | SortOrder
    nextConsultation?: SortOrderInput | SortOrder
    consultationReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctor?: UserOrderByWithRelationInput
    patient?: UserOrderByWithRelationInput
  }

  export type DoctorPatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    doctorId_patientId?: DoctorPatientDoctorIdPatientIdCompoundUniqueInput
    AND?: DoctorPatientWhereInput | DoctorPatientWhereInput[]
    OR?: DoctorPatientWhereInput[]
    NOT?: DoctorPatientWhereInput | DoctorPatientWhereInput[]
    doctorId?: StringFilter<"DoctorPatient"> | string
    patientId?: StringFilter<"DoctorPatient"> | string
    status?: StringFilter<"DoctorPatient"> | string
    notes?: StringNullableFilter<"DoctorPatient"> | string | null
    diseases?: StringNullableFilter<"DoctorPatient"> | string | null
    allergies?: StringNullableFilter<"DoctorPatient"> | string | null
    medications?: StringNullableFilter<"DoctorPatient"> | string | null
    medicalHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    familyHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    surgeryHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    bloodPressure?: StringNullableFilter<"DoctorPatient"> | string | null
    heartRate?: IntNullableFilter<"DoctorPatient"> | number | null
    temperature?: FloatNullableFilter<"DoctorPatient"> | number | null
    symptoms?: StringNullableFilter<"DoctorPatient"> | string | null
    diagnosis?: StringNullableFilter<"DoctorPatient"> | string | null
    treatmentPlan?: StringNullableFilter<"DoctorPatient"> | string | null
    examsRequested?: StringNullableFilter<"DoctorPatient"> | string | null
    observation?: StringNullableFilter<"DoctorPatient"> | string | null
    recommendations?: StringNullableFilter<"DoctorPatient"> | string | null
    documents?: StringNullableFilter<"DoctorPatient"> | string | null
    nextConsultation?: DateTimeNullableFilter<"DoctorPatient"> | Date | string | null
    consultationReason?: StringNullableFilter<"DoctorPatient"> | string | null
    createdAt?: DateTimeFilter<"DoctorPatient"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorPatient"> | Date | string
    doctor?: XOR<UserScalarRelationFilter, UserWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "doctorId_patientId">

  export type DoctorPatientOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    diseases?: SortOrderInput | SortOrder
    allergies?: SortOrderInput | SortOrder
    medications?: SortOrderInput | SortOrder
    medicalHistory?: SortOrderInput | SortOrder
    familyHistory?: SortOrderInput | SortOrder
    surgeryHistory?: SortOrderInput | SortOrder
    bloodPressure?: SortOrderInput | SortOrder
    heartRate?: SortOrderInput | SortOrder
    temperature?: SortOrderInput | SortOrder
    symptoms?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    treatmentPlan?: SortOrderInput | SortOrder
    examsRequested?: SortOrderInput | SortOrder
    observation?: SortOrderInput | SortOrder
    recommendations?: SortOrderInput | SortOrder
    documents?: SortOrderInput | SortOrder
    nextConsultation?: SortOrderInput | SortOrder
    consultationReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DoctorPatientCountOrderByAggregateInput
    _avg?: DoctorPatientAvgOrderByAggregateInput
    _max?: DoctorPatientMaxOrderByAggregateInput
    _min?: DoctorPatientMinOrderByAggregateInput
    _sum?: DoctorPatientSumOrderByAggregateInput
  }

  export type DoctorPatientScalarWhereWithAggregatesInput = {
    AND?: DoctorPatientScalarWhereWithAggregatesInput | DoctorPatientScalarWhereWithAggregatesInput[]
    OR?: DoctorPatientScalarWhereWithAggregatesInput[]
    NOT?: DoctorPatientScalarWhereWithAggregatesInput | DoctorPatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DoctorPatient"> | string
    doctorId?: StringWithAggregatesFilter<"DoctorPatient"> | string
    patientId?: StringWithAggregatesFilter<"DoctorPatient"> | string
    status?: StringWithAggregatesFilter<"DoctorPatient"> | string
    notes?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    diseases?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    allergies?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    medications?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    medicalHistory?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    familyHistory?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    surgeryHistory?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    bloodPressure?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    heartRate?: IntNullableWithAggregatesFilter<"DoctorPatient"> | number | null
    temperature?: FloatNullableWithAggregatesFilter<"DoctorPatient"> | number | null
    symptoms?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    diagnosis?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    treatmentPlan?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    examsRequested?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    observation?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    recommendations?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    documents?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    nextConsultation?: DateTimeNullableWithAggregatesFilter<"DoctorPatient"> | Date | string | null
    consultationReason?: StringNullableWithAggregatesFilter<"DoctorPatient"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DoctorPatient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DoctorPatient"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    type?: StringFilter<"Appointment"> | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    doctor?: XOR<UserScalarRelationFilter, UserWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    doctor?: UserOrderByWithRelationInput
    patient?: UserOrderByWithRelationInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    doctorId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    type?: StringFilter<"Appointment"> | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
    doctor?: XOR<UserScalarRelationFilter, UserWhereInput>
    patient?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _avg?: AppointmentAvgOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
    _sum?: AppointmentSumOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    doctorId?: StringWithAggregatesFilter<"Appointment"> | string
    patientId?: StringWithAggregatesFilter<"Appointment"> | string
    date?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    duration?: IntWithAggregatesFilter<"Appointment"> | number
    type?: StringWithAggregatesFilter<"Appointment"> | string
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    receiverId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    read?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    sender?: UserOrderByWithRelationInput
    receiver?: UserOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    senderId?: StringFilter<"Message"> | string
    receiverId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    read?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
    sender?: XOR<UserScalarRelationFilter, UserWhereInput>
    receiver?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    senderId?: StringWithAggregatesFilter<"Message"> | string
    receiverId?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    read?: BoolWithAggregatesFilter<"Message"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type FoodScanWhereInput = {
    AND?: FoodScanWhereInput | FoodScanWhereInput[]
    OR?: FoodScanWhereInput[]
    NOT?: FoodScanWhereInput | FoodScanWhereInput[]
    id?: StringFilter<"FoodScan"> | string
    userId?: StringFilter<"FoodScan"> | string
    productName?: StringFilter<"FoodScan"> | string
    barcode?: StringNullableFilter<"FoodScan"> | string | null
    brand?: StringNullableFilter<"FoodScan"> | string | null
    imageUrl?: StringNullableFilter<"FoodScan"> | string | null
    ingredients?: StringFilter<"FoodScan"> | string
    result?: EnumFoodScanResultFilter<"FoodScan"> | $Enums.FoodScanResult
    dangerousIngredients?: StringNullableFilter<"FoodScan"> | string | null
    recommendation?: StringFilter<"FoodScan"> | string
    nutriscore?: StringNullableFilter<"FoodScan"> | string | null
    createdAt?: DateTimeFilter<"FoodScan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FoodScanOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    barcode?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    ingredients?: SortOrder
    result?: SortOrder
    dangerousIngredients?: SortOrderInput | SortOrder
    recommendation?: SortOrder
    nutriscore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FoodScanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FoodScanWhereInput | FoodScanWhereInput[]
    OR?: FoodScanWhereInput[]
    NOT?: FoodScanWhereInput | FoodScanWhereInput[]
    userId?: StringFilter<"FoodScan"> | string
    productName?: StringFilter<"FoodScan"> | string
    barcode?: StringNullableFilter<"FoodScan"> | string | null
    brand?: StringNullableFilter<"FoodScan"> | string | null
    imageUrl?: StringNullableFilter<"FoodScan"> | string | null
    ingredients?: StringFilter<"FoodScan"> | string
    result?: EnumFoodScanResultFilter<"FoodScan"> | $Enums.FoodScanResult
    dangerousIngredients?: StringNullableFilter<"FoodScan"> | string | null
    recommendation?: StringFilter<"FoodScan"> | string
    nutriscore?: StringNullableFilter<"FoodScan"> | string | null
    createdAt?: DateTimeFilter<"FoodScan"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FoodScanOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    barcode?: SortOrderInput | SortOrder
    brand?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    ingredients?: SortOrder
    result?: SortOrder
    dangerousIngredients?: SortOrderInput | SortOrder
    recommendation?: SortOrder
    nutriscore?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FoodScanCountOrderByAggregateInput
    _max?: FoodScanMaxOrderByAggregateInput
    _min?: FoodScanMinOrderByAggregateInput
  }

  export type FoodScanScalarWhereWithAggregatesInput = {
    AND?: FoodScanScalarWhereWithAggregatesInput | FoodScanScalarWhereWithAggregatesInput[]
    OR?: FoodScanScalarWhereWithAggregatesInput[]
    NOT?: FoodScanScalarWhereWithAggregatesInput | FoodScanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FoodScan"> | string
    userId?: StringWithAggregatesFilter<"FoodScan"> | string
    productName?: StringWithAggregatesFilter<"FoodScan"> | string
    barcode?: StringNullableWithAggregatesFilter<"FoodScan"> | string | null
    brand?: StringNullableWithAggregatesFilter<"FoodScan"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"FoodScan"> | string | null
    ingredients?: StringWithAggregatesFilter<"FoodScan"> | string
    result?: EnumFoodScanResultWithAggregatesFilter<"FoodScan"> | $Enums.FoodScanResult
    dangerousIngredients?: StringNullableWithAggregatesFilter<"FoodScan"> | string | null
    recommendation?: StringWithAggregatesFilter<"FoodScan"> | string
    nutriscore?: StringNullableWithAggregatesFilter<"FoodScan"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FoodScan"> | Date | string
  }

  export type ReportWhereInput = {
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    id?: StringFilter<"Report"> | string
    userId?: StringFilter<"Report"> | string
    type?: StringFilter<"Report"> | string
    subject?: StringFilter<"Report"> | string
    message?: StringFilter<"Report"> | string
    productName?: StringNullableFilter<"Report"> | string | null
    barcode?: StringNullableFilter<"Report"> | string | null
    imageUrl?: StringNullableFilter<"Report"> | string | null
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    productName?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReportWhereInput | ReportWhereInput[]
    OR?: ReportWhereInput[]
    NOT?: ReportWhereInput | ReportWhereInput[]
    userId?: StringFilter<"Report"> | string
    type?: StringFilter<"Report"> | string
    subject?: StringFilter<"Report"> | string
    message?: StringFilter<"Report"> | string
    productName?: StringNullableFilter<"Report"> | string | null
    barcode?: StringNullableFilter<"Report"> | string | null
    imageUrl?: StringNullableFilter<"Report"> | string | null
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    productName?: SortOrderInput | SortOrder
    barcode?: SortOrderInput | SortOrder
    imageUrl?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    OR?: ReportScalarWhereWithAggregatesInput[]
    NOT?: ReportScalarWhereWithAggregatesInput | ReportScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Report"> | string
    userId?: StringWithAggregatesFilter<"Report"> | string
    type?: StringWithAggregatesFilter<"Report"> | string
    subject?: StringWithAggregatesFilter<"Report"> | string
    message?: StringWithAggregatesFilter<"Report"> | string
    productName?: StringNullableWithAggregatesFilter<"Report"> | string | null
    barcode?: StringNullableWithAggregatesFilter<"Report"> | string | null
    imageUrl?: StringNullableWithAggregatesFilter<"Report"> | string | null
    status?: EnumReportStatusWithAggregatesFilter<"Report"> | $Enums.ReportStatus
    createdAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Report"> | Date | string
  }

  export type NotificationWhereInput = {
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type NotificationOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type NotificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NotificationWhereInput | NotificationWhereInput[]
    OR?: NotificationWhereInput[]
    NOT?: NotificationWhereInput | NotificationWhereInput[]
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type NotificationOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrderInput | SortOrder
    read?: SortOrder
    createdAt?: SortOrder
    _count?: NotificationCountOrderByAggregateInput
    _max?: NotificationMaxOrderByAggregateInput
    _min?: NotificationMinOrderByAggregateInput
  }

  export type NotificationScalarWhereWithAggregatesInput = {
    AND?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    OR?: NotificationScalarWhereWithAggregatesInput[]
    NOT?: NotificationScalarWhereWithAggregatesInput | NotificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notification"> | string
    userId?: StringWithAggregatesFilter<"Notification"> | string
    title?: StringWithAggregatesFilter<"Notification"> | string
    message?: StringWithAggregatesFilter<"Notification"> | string
    type?: StringWithAggregatesFilter<"Notification"> | string
    link?: StringNullableWithAggregatesFilter<"Notification"> | string | null
    read?: BoolWithAggregatesFilter<"Notification"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Notification"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorProfileCreateInput = {
    id?: string
    specialty: string
    licenseNumber: string
    clinicAddress: string
    bio?: string | null
    consultationFee?: number | null
    gender?: string | null
    yearsOfExperience?: number | null
    spokenLanguages?: string | null
    city?: string | null
    country?: string | null
    consultationMode?: string | null
    linkedin?: string | null
    whatsapp?: string | null
    telegram?: string | null
    googleMapsLink?: string | null
    subscriptionStatus?: $Enums.SubscriptionStatus
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    availability?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutDoctorProfileInput
  }

  export type DoctorProfileUncheckedCreateInput = {
    id?: string
    userId: string
    specialty: string
    licenseNumber: string
    clinicAddress: string
    bio?: string | null
    consultationFee?: number | null
    gender?: string | null
    yearsOfExperience?: number | null
    spokenLanguages?: string | null
    city?: string | null
    country?: string | null
    consultationMode?: string | null
    linkedin?: string | null
    whatsapp?: string | null
    telegram?: string | null
    googleMapsLink?: string | null
    subscriptionStatus?: $Enums.SubscriptionStatus
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    availability?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    clinicAddress?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    spokenLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    consultationMode?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    googleMapsLink?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutDoctorProfileNestedInput
  }

  export type DoctorProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    clinicAddress?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    spokenLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    consultationMode?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    googleMapsLink?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorProfileCreateManyInput = {
    id?: string
    userId: string
    specialty: string
    licenseNumber: string
    clinicAddress: string
    bio?: string | null
    consultationFee?: number | null
    gender?: string | null
    yearsOfExperience?: number | null
    spokenLanguages?: string | null
    city?: string | null
    country?: string | null
    consultationMode?: string | null
    linkedin?: string | null
    whatsapp?: string | null
    telegram?: string | null
    googleMapsLink?: string | null
    subscriptionStatus?: $Enums.SubscriptionStatus
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    availability?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    clinicAddress?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    spokenLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    consultationMode?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    googleMapsLink?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    clinicAddress?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    spokenLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    consultationMode?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    googleMapsLink?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthProfileCreateInput = {
    id?: string
    birthDate?: Date | string | null
    gender?: string | null
    height?: number | null
    weight?: number | null
    bloodType?: string | null
    diet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutHealthProfileInput
  }

  export type HealthProfileUncheckedCreateInput = {
    id?: string
    userId: string
    birthDate?: Date | string | null
    gender?: string | null
    height?: number | null
    weight?: number | null
    bloodType?: string | null
    diet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    diet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutHealthProfileNestedInput
  }

  export type HealthProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    diet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthProfileCreateManyInput = {
    id?: string
    userId: string
    birthDate?: Date | string | null
    gender?: string | null
    height?: number | null
    weight?: number | null
    bloodType?: string | null
    diet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    diet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    diet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorPatientCreateInput = {
    id?: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: UserCreateNestedOneWithoutDoctorPatientsInput
    patient: UserCreateNestedOneWithoutPatientDoctorsInput
  }

  export type DoctorPatientUncheckedCreateInput = {
    id?: string
    doctorId: string
    patientId: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorPatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: UserUpdateOneRequiredWithoutDoctorPatientsNestedInput
    patient?: UserUpdateOneRequiredWithoutPatientDoctorsNestedInput
  }

  export type DoctorPatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorPatientCreateManyInput = {
    id?: string
    doctorId: string
    patientId: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorPatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorPatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: UserCreateNestedOneWithoutDoctorAppointmentsInput
    patient: UserCreateNestedOneWithoutPatientAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    doctorId: string
    patientId: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: UserUpdateOneRequiredWithoutDoctorAppointmentsNestedInput
    patient?: UserUpdateOneRequiredWithoutPatientAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    doctorId: string
    patientId: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    content: string
    read?: boolean
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    senderId: string
    receiverId: string
    content: string
    read?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    senderId: string
    receiverId: string
    content: string
    read?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodScanCreateInput = {
    id?: string
    productName: string
    barcode?: string | null
    brand?: string | null
    imageUrl?: string | null
    ingredients: string
    result: $Enums.FoodScanResult
    dangerousIngredients?: string | null
    recommendation: string
    nutriscore?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutFoodScansInput
  }

  export type FoodScanUncheckedCreateInput = {
    id?: string
    userId: string
    productName: string
    barcode?: string | null
    brand?: string | null
    imageUrl?: string | null
    ingredients: string
    result: $Enums.FoodScanResult
    dangerousIngredients?: string | null
    recommendation: string
    nutriscore?: string | null
    createdAt?: Date | string
  }

  export type FoodScanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: StringFieldUpdateOperationsInput | string
    result?: EnumFoodScanResultFieldUpdateOperationsInput | $Enums.FoodScanResult
    dangerousIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: StringFieldUpdateOperationsInput | string
    nutriscore?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFoodScansNestedInput
  }

  export type FoodScanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: StringFieldUpdateOperationsInput | string
    result?: EnumFoodScanResultFieldUpdateOperationsInput | $Enums.FoodScanResult
    dangerousIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: StringFieldUpdateOperationsInput | string
    nutriscore?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodScanCreateManyInput = {
    id?: string
    userId: string
    productName: string
    barcode?: string | null
    brand?: string | null
    imageUrl?: string | null
    ingredients: string
    result: $Enums.FoodScanResult
    dangerousIngredients?: string | null
    recommendation: string
    nutriscore?: string | null
    createdAt?: Date | string
  }

  export type FoodScanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: StringFieldUpdateOperationsInput | string
    result?: EnumFoodScanResultFieldUpdateOperationsInput | $Enums.FoodScanResult
    dangerousIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: StringFieldUpdateOperationsInput | string
    nutriscore?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodScanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: StringFieldUpdateOperationsInput | string
    result?: EnumFoodScanResultFieldUpdateOperationsInput | $Enums.FoodScanResult
    dangerousIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: StringFieldUpdateOperationsInput | string
    nutriscore?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateInput = {
    id?: string
    type?: string
    subject: string
    message: string
    productName?: string | null
    barcode?: string | null
    imageUrl?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReportsInput
  }

  export type ReportUncheckedCreateInput = {
    id?: string
    userId: string
    type?: string
    subject: string
    message: string
    productName?: string | null
    barcode?: string | null
    imageUrl?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReportsNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateManyInput = {
    id?: string
    userId: string
    type?: string
    subject: string
    message: string
    productName?: string | null
    barcode?: string | null
    imageUrl?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateInput = {
    id?: string
    title: string
    message: string
    type: string
    link?: string | null
    read?: boolean
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutNotificationsInput
  }

  export type NotificationUncheckedCreateInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    link?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutNotificationsNestedInput
  }

  export type NotificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationCreateManyInput = {
    id?: string
    userId: string
    title: string
    message: string
    type: string
    link?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DoctorProfileNullableScalarRelationFilter = {
    is?: DoctorProfileWhereInput | null
    isNot?: DoctorProfileWhereInput | null
  }

  export type HealthProfileNullableScalarRelationFilter = {
    is?: HealthProfileWhereInput | null
    isNot?: HealthProfileWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type FoodScanListRelationFilter = {
    every?: FoodScanWhereInput
    some?: FoodScanWhereInput
    none?: FoodScanWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type DoctorPatientListRelationFilter = {
    every?: DoctorPatientWhereInput
    some?: DoctorPatientWhereInput
    none?: DoctorPatientWhereInput
  }

  export type NotificationListRelationFilter = {
    every?: NotificationWhereInput
    some?: NotificationWhereInput
    none?: NotificationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FoodScanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DoctorPatientOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NotificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phone?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[]
    notIn?: $Enums.SubscriptionStatus[]
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DoctorProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    clinicAddress?: SortOrder
    bio?: SortOrder
    consultationFee?: SortOrder
    gender?: SortOrder
    yearsOfExperience?: SortOrder
    spokenLanguages?: SortOrder
    city?: SortOrder
    country?: SortOrder
    consultationMode?: SortOrder
    linkedin?: SortOrder
    whatsapp?: SortOrder
    telegram?: SortOrder
    googleMapsLink?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionStart?: SortOrder
    subscriptionEnd?: SortOrder
    availability?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorProfileAvgOrderByAggregateInput = {
    consultationFee?: SortOrder
    yearsOfExperience?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type DoctorProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    clinicAddress?: SortOrder
    bio?: SortOrder
    consultationFee?: SortOrder
    gender?: SortOrder
    yearsOfExperience?: SortOrder
    spokenLanguages?: SortOrder
    city?: SortOrder
    country?: SortOrder
    consultationMode?: SortOrder
    linkedin?: SortOrder
    whatsapp?: SortOrder
    telegram?: SortOrder
    googleMapsLink?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionStart?: SortOrder
    subscriptionEnd?: SortOrder
    availability?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    licenseNumber?: SortOrder
    clinicAddress?: SortOrder
    bio?: SortOrder
    consultationFee?: SortOrder
    gender?: SortOrder
    yearsOfExperience?: SortOrder
    spokenLanguages?: SortOrder
    city?: SortOrder
    country?: SortOrder
    consultationMode?: SortOrder
    linkedin?: SortOrder
    whatsapp?: SortOrder
    telegram?: SortOrder
    googleMapsLink?: SortOrder
    subscriptionStatus?: SortOrder
    subscriptionStart?: SortOrder
    subscriptionEnd?: SortOrder
    availability?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorProfileSumOrderByAggregateInput = {
    consultationFee?: SortOrder
    yearsOfExperience?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[]
    notIn?: $Enums.SubscriptionStatus[]
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type HealthProfileCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    bloodType?: SortOrder
    diet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthProfileAvgOrderByAggregateInput = {
    height?: SortOrder
    weight?: SortOrder
  }

  export type HealthProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    bloodType?: SortOrder
    diet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthProfileMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    birthDate?: SortOrder
    gender?: SortOrder
    height?: SortOrder
    weight?: SortOrder
    bloodType?: SortOrder
    diet?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type HealthProfileSumOrderByAggregateInput = {
    height?: SortOrder
    weight?: SortOrder
  }

  export type DoctorPatientDoctorIdPatientIdCompoundUniqueInput = {
    doctorId: string
    patientId: string
  }

  export type DoctorPatientCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    diseases?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    medicalHistory?: SortOrder
    familyHistory?: SortOrder
    surgeryHistory?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    temperature?: SortOrder
    symptoms?: SortOrder
    diagnosis?: SortOrder
    treatmentPlan?: SortOrder
    examsRequested?: SortOrder
    observation?: SortOrder
    recommendations?: SortOrder
    documents?: SortOrder
    nextConsultation?: SortOrder
    consultationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorPatientAvgOrderByAggregateInput = {
    heartRate?: SortOrder
    temperature?: SortOrder
  }

  export type DoctorPatientMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    diseases?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    medicalHistory?: SortOrder
    familyHistory?: SortOrder
    surgeryHistory?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    temperature?: SortOrder
    symptoms?: SortOrder
    diagnosis?: SortOrder
    treatmentPlan?: SortOrder
    examsRequested?: SortOrder
    observation?: SortOrder
    recommendations?: SortOrder
    documents?: SortOrder
    nextConsultation?: SortOrder
    consultationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorPatientMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    diseases?: SortOrder
    allergies?: SortOrder
    medications?: SortOrder
    medicalHistory?: SortOrder
    familyHistory?: SortOrder
    surgeryHistory?: SortOrder
    bloodPressure?: SortOrder
    heartRate?: SortOrder
    temperature?: SortOrder
    symptoms?: SortOrder
    diagnosis?: SortOrder
    treatmentPlan?: SortOrder
    examsRequested?: SortOrder
    observation?: SortOrder
    recommendations?: SortOrder
    documents?: SortOrder
    nextConsultation?: SortOrder
    consultationReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DoctorPatientSumOrderByAggregateInput = {
    heartRate?: SortOrder
    temperature?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentAvgOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    doctorId?: SortOrder
    patientId?: SortOrder
    date?: SortOrder
    duration?: SortOrder
    type?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppointmentSumOrderByAggregateInput = {
    duration?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    senderId?: SortOrder
    receiverId?: SortOrder
    content?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumFoodScanResultFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodScanResult | EnumFoodScanResultFieldRefInput<$PrismaModel>
    in?: $Enums.FoodScanResult[]
    notIn?: $Enums.FoodScanResult[]
    not?: NestedEnumFoodScanResultFilter<$PrismaModel> | $Enums.FoodScanResult
  }

  export type FoodScanCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    barcode?: SortOrder
    brand?: SortOrder
    imageUrl?: SortOrder
    ingredients?: SortOrder
    result?: SortOrder
    dangerousIngredients?: SortOrder
    recommendation?: SortOrder
    nutriscore?: SortOrder
    createdAt?: SortOrder
  }

  export type FoodScanMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    barcode?: SortOrder
    brand?: SortOrder
    imageUrl?: SortOrder
    ingredients?: SortOrder
    result?: SortOrder
    dangerousIngredients?: SortOrder
    recommendation?: SortOrder
    nutriscore?: SortOrder
    createdAt?: SortOrder
  }

  export type FoodScanMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    productName?: SortOrder
    barcode?: SortOrder
    brand?: SortOrder
    imageUrl?: SortOrder
    ingredients?: SortOrder
    result?: SortOrder
    dangerousIngredients?: SortOrder
    recommendation?: SortOrder
    nutriscore?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumFoodScanResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodScanResult | EnumFoodScanResultFieldRefInput<$PrismaModel>
    in?: $Enums.FoodScanResult[]
    notIn?: $Enums.FoodScanResult[]
    not?: NestedEnumFoodScanResultWithAggregatesFilter<$PrismaModel> | $Enums.FoodScanResult
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFoodScanResultFilter<$PrismaModel>
    _max?: NestedEnumFoodScanResultFilter<$PrismaModel>
  }

  export type EnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[]
    notIn?: $Enums.ReportStatus[]
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    productName?: SortOrder
    barcode?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    productName?: SortOrder
    barcode?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    subject?: SortOrder
    message?: SortOrder
    productName?: SortOrder
    barcode?: SortOrder
    imageUrl?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[]
    notIn?: $Enums.ReportStatus[]
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type NotificationCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type NotificationMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    message?: SortOrder
    type?: SortOrder
    link?: SortOrder
    read?: SortOrder
    createdAt?: SortOrder
  }

  export type DoctorProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorProfileCreateWithoutUserInput, DoctorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorProfileCreateOrConnectWithoutUserInput
    connect?: DoctorProfileWhereUniqueInput
  }

  export type HealthProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput
    connect?: HealthProfileWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type FoodScanCreateNestedManyWithoutUserInput = {
    create?: XOR<FoodScanCreateWithoutUserInput, FoodScanUncheckedCreateWithoutUserInput> | FoodScanCreateWithoutUserInput[] | FoodScanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodScanCreateOrConnectWithoutUserInput | FoodScanCreateOrConnectWithoutUserInput[]
    createMany?: FoodScanCreateManyUserInputEnvelope
    connect?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
  }

  export type ReportCreateNestedManyWithoutUserInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type DoctorPatientCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorPatientCreateWithoutDoctorInput, DoctorPatientUncheckedCreateWithoutDoctorInput> | DoctorPatientCreateWithoutDoctorInput[] | DoctorPatientUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutDoctorInput | DoctorPatientCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorPatientCreateManyDoctorInputEnvelope
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
  }

  export type DoctorPatientCreateNestedManyWithoutPatientInput = {
    create?: XOR<DoctorPatientCreateWithoutPatientInput, DoctorPatientUncheckedCreateWithoutPatientInput> | DoctorPatientCreateWithoutPatientInput[] | DoctorPatientUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutPatientInput | DoctorPatientCreateOrConnectWithoutPatientInput[]
    createMany?: DoctorPatientCreateManyPatientInputEnvelope
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
  }

  export type NotificationCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type DoctorProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<DoctorProfileCreateWithoutUserInput, DoctorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorProfileCreateOrConnectWithoutUserInput
    connect?: DoctorProfileWhereUniqueInput
  }

  export type HealthProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput
    connect?: HealthProfileWhereUniqueInput
  }

  export type MessageUncheckedCreateNestedManyWithoutSenderInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutReceiverInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type FoodScanUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FoodScanCreateWithoutUserInput, FoodScanUncheckedCreateWithoutUserInput> | FoodScanCreateWithoutUserInput[] | FoodScanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodScanCreateOrConnectWithoutUserInput | FoodScanCreateOrConnectWithoutUserInput[]
    createMany?: FoodScanCreateManyUserInputEnvelope
    connect?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
  }

  export type ReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput = {
    create?: XOR<DoctorPatientCreateWithoutDoctorInput, DoctorPatientUncheckedCreateWithoutDoctorInput> | DoctorPatientCreateWithoutDoctorInput[] | DoctorPatientUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutDoctorInput | DoctorPatientCreateOrConnectWithoutDoctorInput[]
    createMany?: DoctorPatientCreateManyDoctorInputEnvelope
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
  }

  export type DoctorPatientUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<DoctorPatientCreateWithoutPatientInput, DoctorPatientUncheckedCreateWithoutPatientInput> | DoctorPatientCreateWithoutPatientInput[] | DoctorPatientUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutPatientInput | DoctorPatientCreateOrConnectWithoutPatientInput[]
    createMany?: DoctorPatientCreateManyPatientInputEnvelope
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
  }

  export type NotificationUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type DoctorProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorProfileCreateWithoutUserInput, DoctorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorProfileCreateOrConnectWithoutUserInput
    upsert?: DoctorProfileUpsertWithoutUserInput
    disconnect?: DoctorProfileWhereInput | boolean
    delete?: DoctorProfileWhereInput | boolean
    connect?: DoctorProfileWhereUniqueInput
    update?: XOR<XOR<DoctorProfileUpdateToOneWithWhereWithoutUserInput, DoctorProfileUpdateWithoutUserInput>, DoctorProfileUncheckedUpdateWithoutUserInput>
  }

  export type HealthProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput
    upsert?: HealthProfileUpsertWithoutUserInput
    disconnect?: HealthProfileWhereInput | boolean
    delete?: HealthProfileWhereInput | boolean
    connect?: HealthProfileWhereUniqueInput
    update?: XOR<XOR<HealthProfileUpdateToOneWithWhereWithoutUserInput, HealthProfileUpdateWithoutUserInput>, HealthProfileUncheckedUpdateWithoutUserInput>
  }

  export type MessageUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type FoodScanUpdateManyWithoutUserNestedInput = {
    create?: XOR<FoodScanCreateWithoutUserInput, FoodScanUncheckedCreateWithoutUserInput> | FoodScanCreateWithoutUserInput[] | FoodScanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodScanCreateOrConnectWithoutUserInput | FoodScanCreateOrConnectWithoutUserInput[]
    upsert?: FoodScanUpsertWithWhereUniqueWithoutUserInput | FoodScanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FoodScanCreateManyUserInputEnvelope
    set?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    disconnect?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    delete?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    connect?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    update?: FoodScanUpdateWithWhereUniqueWithoutUserInput | FoodScanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FoodScanUpdateManyWithWhereWithoutUserInput | FoodScanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FoodScanScalarWhereInput | FoodScanScalarWhereInput[]
  }

  export type ReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutUserInput | ReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutUserInput | ReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutUserInput | ReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DoctorPatientUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorPatientCreateWithoutDoctorInput, DoctorPatientUncheckedCreateWithoutDoctorInput> | DoctorPatientCreateWithoutDoctorInput[] | DoctorPatientUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutDoctorInput | DoctorPatientCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorPatientUpsertWithWhereUniqueWithoutDoctorInput | DoctorPatientUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorPatientCreateManyDoctorInputEnvelope
    set?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    disconnect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    delete?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    update?: DoctorPatientUpdateWithWhereUniqueWithoutDoctorInput | DoctorPatientUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorPatientUpdateManyWithWhereWithoutDoctorInput | DoctorPatientUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorPatientScalarWhereInput | DoctorPatientScalarWhereInput[]
  }

  export type DoctorPatientUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DoctorPatientCreateWithoutPatientInput, DoctorPatientUncheckedCreateWithoutPatientInput> | DoctorPatientCreateWithoutPatientInput[] | DoctorPatientUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutPatientInput | DoctorPatientCreateOrConnectWithoutPatientInput[]
    upsert?: DoctorPatientUpsertWithWhereUniqueWithoutPatientInput | DoctorPatientUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DoctorPatientCreateManyPatientInputEnvelope
    set?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    disconnect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    delete?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    update?: DoctorPatientUpdateWithWhereUniqueWithoutPatientInput | DoctorPatientUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DoctorPatientUpdateManyWithWhereWithoutPatientInput | DoctorPatientUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DoctorPatientScalarWhereInput | DoctorPatientScalarWhereInput[]
  }

  export type NotificationUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type DoctorProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<DoctorProfileCreateWithoutUserInput, DoctorProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: DoctorProfileCreateOrConnectWithoutUserInput
    upsert?: DoctorProfileUpsertWithoutUserInput
    disconnect?: DoctorProfileWhereInput | boolean
    delete?: DoctorProfileWhereInput | boolean
    connect?: DoctorProfileWhereUniqueInput
    update?: XOR<XOR<DoctorProfileUpdateToOneWithWhereWithoutUserInput, DoctorProfileUpdateWithoutUserInput>, DoctorProfileUncheckedUpdateWithoutUserInput>
  }

  export type HealthProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: HealthProfileCreateOrConnectWithoutUserInput
    upsert?: HealthProfileUpsertWithoutUserInput
    disconnect?: HealthProfileWhereInput | boolean
    delete?: HealthProfileWhereInput | boolean
    connect?: HealthProfileWhereUniqueInput
    update?: XOR<XOR<HealthProfileUpdateToOneWithWhereWithoutUserInput, HealthProfileUpdateWithoutUserInput>, HealthProfileUncheckedUpdateWithoutUserInput>
  }

  export type MessageUncheckedUpdateManyWithoutSenderNestedInput = {
    create?: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput> | MessageCreateWithoutSenderInput[] | MessageUncheckedCreateWithoutSenderInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutSenderInput | MessageCreateOrConnectWithoutSenderInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutSenderInput | MessageUpsertWithWhereUniqueWithoutSenderInput[]
    createMany?: MessageCreateManySenderInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutSenderInput | MessageUpdateWithWhereUniqueWithoutSenderInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutSenderInput | MessageUpdateManyWithWhereWithoutSenderInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutReceiverNestedInput = {
    create?: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput> | MessageCreateWithoutReceiverInput[] | MessageUncheckedCreateWithoutReceiverInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutReceiverInput | MessageCreateOrConnectWithoutReceiverInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutReceiverInput | MessageUpsertWithWhereUniqueWithoutReceiverInput[]
    createMany?: MessageCreateManyReceiverInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutReceiverInput | MessageUpdateWithWhereUniqueWithoutReceiverInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutReceiverInput | MessageUpdateManyWithWhereWithoutReceiverInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type FoodScanUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FoodScanCreateWithoutUserInput, FoodScanUncheckedCreateWithoutUserInput> | FoodScanCreateWithoutUserInput[] | FoodScanUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FoodScanCreateOrConnectWithoutUserInput | FoodScanCreateOrConnectWithoutUserInput[]
    upsert?: FoodScanUpsertWithWhereUniqueWithoutUserInput | FoodScanUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FoodScanCreateManyUserInputEnvelope
    set?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    disconnect?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    delete?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    connect?: FoodScanWhereUniqueInput | FoodScanWhereUniqueInput[]
    update?: FoodScanUpdateWithWhereUniqueWithoutUserInput | FoodScanUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FoodScanUpdateManyWithWhereWithoutUserInput | FoodScanUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FoodScanScalarWhereInput | FoodScanScalarWhereInput[]
  }

  export type ReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput> | ReportCreateWithoutUserInput[] | ReportUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ReportCreateOrConnectWithoutUserInput | ReportCreateOrConnectWithoutUserInput[]
    upsert?: ReportUpsertWithWhereUniqueWithoutUserInput | ReportUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ReportCreateManyUserInputEnvelope
    set?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    disconnect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    delete?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    connect?: ReportWhereUniqueInput | ReportWhereUniqueInput[]
    update?: ReportUpdateWithWhereUniqueWithoutUserInput | ReportUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ReportUpdateManyWithWhereWithoutUserInput | ReportUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ReportScalarWhereInput | ReportScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput> | AppointmentCreateWithoutDoctorInput[] | AppointmentUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutDoctorInput | AppointmentCreateOrConnectWithoutDoctorInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutDoctorInput | AppointmentUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: AppointmentCreateManyDoctorInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutDoctorInput | AppointmentUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutDoctorInput | AppointmentUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput> | AppointmentCreateWithoutPatientInput[] | AppointmentUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutPatientInput | AppointmentCreateOrConnectWithoutPatientInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutPatientInput | AppointmentUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: AppointmentCreateManyPatientInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutPatientInput | AppointmentUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutPatientInput | AppointmentUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput = {
    create?: XOR<DoctorPatientCreateWithoutDoctorInput, DoctorPatientUncheckedCreateWithoutDoctorInput> | DoctorPatientCreateWithoutDoctorInput[] | DoctorPatientUncheckedCreateWithoutDoctorInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutDoctorInput | DoctorPatientCreateOrConnectWithoutDoctorInput[]
    upsert?: DoctorPatientUpsertWithWhereUniqueWithoutDoctorInput | DoctorPatientUpsertWithWhereUniqueWithoutDoctorInput[]
    createMany?: DoctorPatientCreateManyDoctorInputEnvelope
    set?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    disconnect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    delete?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    update?: DoctorPatientUpdateWithWhereUniqueWithoutDoctorInput | DoctorPatientUpdateWithWhereUniqueWithoutDoctorInput[]
    updateMany?: DoctorPatientUpdateManyWithWhereWithoutDoctorInput | DoctorPatientUpdateManyWithWhereWithoutDoctorInput[]
    deleteMany?: DoctorPatientScalarWhereInput | DoctorPatientScalarWhereInput[]
  }

  export type DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<DoctorPatientCreateWithoutPatientInput, DoctorPatientUncheckedCreateWithoutPatientInput> | DoctorPatientCreateWithoutPatientInput[] | DoctorPatientUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: DoctorPatientCreateOrConnectWithoutPatientInput | DoctorPatientCreateOrConnectWithoutPatientInput[]
    upsert?: DoctorPatientUpsertWithWhereUniqueWithoutPatientInput | DoctorPatientUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: DoctorPatientCreateManyPatientInputEnvelope
    set?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    disconnect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    delete?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    connect?: DoctorPatientWhereUniqueInput | DoctorPatientWhereUniqueInput[]
    update?: DoctorPatientUpdateWithWhereUniqueWithoutPatientInput | DoctorPatientUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: DoctorPatientUpdateManyWithWhereWithoutPatientInput | DoctorPatientUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: DoctorPatientScalarWhereInput | DoctorPatientScalarWhereInput[]
  }

  export type NotificationUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput> | NotificationCreateWithoutUserInput[] | NotificationUncheckedCreateWithoutUserInput[]
    connectOrCreate?: NotificationCreateOrConnectWithoutUserInput | NotificationCreateOrConnectWithoutUserInput[]
    upsert?: NotificationUpsertWithWhereUniqueWithoutUserInput | NotificationUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: NotificationCreateManyUserInputEnvelope
    set?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    disconnect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    delete?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    connect?: NotificationWhereUniqueInput | NotificationWhereUniqueInput[]
    update?: NotificationUpdateWithWhereUniqueWithoutUserInput | NotificationUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: NotificationUpdateManyWithWhereWithoutUserInput | NotificationUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutDoctorProfileInput = {
    create?: XOR<UserCreateWithoutDoctorProfileInput, UserUncheckedCreateWithoutDoctorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorProfileInput
    connect?: UserWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumSubscriptionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SubscriptionStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutDoctorProfileNestedInput = {
    create?: XOR<UserCreateWithoutDoctorProfileInput, UserUncheckedCreateWithoutDoctorProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorProfileInput
    upsert?: UserUpsertWithoutDoctorProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorProfileInput, UserUpdateWithoutDoctorProfileInput>, UserUncheckedUpdateWithoutDoctorProfileInput>
  }

  export type UserCreateNestedOneWithoutHealthProfileInput = {
    create?: XOR<UserCreateWithoutHealthProfileInput, UserUncheckedCreateWithoutHealthProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutHealthProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutHealthProfileNestedInput = {
    create?: XOR<UserCreateWithoutHealthProfileInput, UserUncheckedCreateWithoutHealthProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutHealthProfileInput
    upsert?: UserUpsertWithoutHealthProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutHealthProfileInput, UserUpdateWithoutHealthProfileInput>, UserUncheckedUpdateWithoutHealthProfileInput>
  }

  export type UserCreateNestedOneWithoutDoctorPatientsInput = {
    create?: XOR<UserCreateWithoutDoctorPatientsInput, UserUncheckedCreateWithoutDoctorPatientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorPatientsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPatientDoctorsInput = {
    create?: XOR<UserCreateWithoutPatientDoctorsInput, UserUncheckedCreateWithoutPatientDoctorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientDoctorsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDoctorPatientsNestedInput = {
    create?: XOR<UserCreateWithoutDoctorPatientsInput, UserUncheckedCreateWithoutDoctorPatientsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorPatientsInput
    upsert?: UserUpsertWithoutDoctorPatientsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorPatientsInput, UserUpdateWithoutDoctorPatientsInput>, UserUncheckedUpdateWithoutDoctorPatientsInput>
  }

  export type UserUpdateOneRequiredWithoutPatientDoctorsNestedInput = {
    create?: XOR<UserCreateWithoutPatientDoctorsInput, UserUncheckedCreateWithoutPatientDoctorsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientDoctorsInput
    upsert?: UserUpsertWithoutPatientDoctorsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientDoctorsInput, UserUpdateWithoutPatientDoctorsInput>, UserUncheckedUpdateWithoutPatientDoctorsInput>
  }

  export type UserCreateNestedOneWithoutDoctorAppointmentsInput = {
    create?: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPatientAppointmentsInput = {
    create?: XOR<UserCreateWithoutPatientAppointmentsInput, UserUncheckedCreateWithoutPatientAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientAppointmentsInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type UserUpdateOneRequiredWithoutDoctorAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDoctorAppointmentsInput
    upsert?: UserUpsertWithoutDoctorAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDoctorAppointmentsInput, UserUpdateWithoutDoctorAppointmentsInput>, UserUncheckedUpdateWithoutDoctorAppointmentsInput>
  }

  export type UserUpdateOneRequiredWithoutPatientAppointmentsNestedInput = {
    create?: XOR<UserCreateWithoutPatientAppointmentsInput, UserUncheckedCreateWithoutPatientAppointmentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPatientAppointmentsInput
    upsert?: UserUpsertWithoutPatientAppointmentsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPatientAppointmentsInput, UserUpdateWithoutPatientAppointmentsInput>, UserUncheckedUpdateWithoutPatientAppointmentsInput>
  }

  export type UserCreateNestedOneWithoutSentMessagesInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedMessagesInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutSentMessagesNestedInput = {
    create?: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentMessagesInput
    upsert?: UserUpsertWithoutSentMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentMessagesInput, UserUpdateWithoutSentMessagesInput>, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedMessagesNestedInput = {
    create?: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedMessagesInput
    upsert?: UserUpsertWithoutReceivedMessagesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedMessagesInput, UserUpdateWithoutReceivedMessagesInput>, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserCreateNestedOneWithoutFoodScansInput = {
    create?: XOR<UserCreateWithoutFoodScansInput, UserUncheckedCreateWithoutFoodScansInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoodScansInput
    connect?: UserWhereUniqueInput
  }

  export type EnumFoodScanResultFieldUpdateOperationsInput = {
    set?: $Enums.FoodScanResult
  }

  export type UserUpdateOneRequiredWithoutFoodScansNestedInput = {
    create?: XOR<UserCreateWithoutFoodScansInput, UserUncheckedCreateWithoutFoodScansInput>
    connectOrCreate?: UserCreateOrConnectWithoutFoodScansInput
    upsert?: UserUpsertWithoutFoodScansInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFoodScansInput, UserUpdateWithoutFoodScansInput>, UserUncheckedUpdateWithoutFoodScansInput>
  }

  export type UserCreateNestedOneWithoutReportsInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus
  }

  export type UserUpdateOneRequiredWithoutReportsNestedInput = {
    create?: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportsInput
    upsert?: UserUpsertWithoutReportsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReportsInput, UserUpdateWithoutReportsInput>, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserCreateNestedOneWithoutNotificationsInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutNotificationsNestedInput = {
    create?: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutNotificationsInput
    upsert?: UserUpsertWithoutNotificationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNotificationsInput, UserUpdateWithoutNotificationsInput>, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[]
    notIn?: $Enums.UserRole[]
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSubscriptionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[]
    notIn?: $Enums.SubscriptionStatus[]
    not?: NestedEnumSubscriptionStatusFilter<$PrismaModel> | $Enums.SubscriptionStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SubscriptionStatus | EnumSubscriptionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SubscriptionStatus[]
    notIn?: $Enums.SubscriptionStatus[]
    not?: NestedEnumSubscriptionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SubscriptionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
    _max?: NestedEnumSubscriptionStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumFoodScanResultFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodScanResult | EnumFoodScanResultFieldRefInput<$PrismaModel>
    in?: $Enums.FoodScanResult[]
    notIn?: $Enums.FoodScanResult[]
    not?: NestedEnumFoodScanResultFilter<$PrismaModel> | $Enums.FoodScanResult
  }

  export type NestedEnumFoodScanResultWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FoodScanResult | EnumFoodScanResultFieldRefInput<$PrismaModel>
    in?: $Enums.FoodScanResult[]
    notIn?: $Enums.FoodScanResult[]
    not?: NestedEnumFoodScanResultWithAggregatesFilter<$PrismaModel> | $Enums.FoodScanResult
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFoodScanResultFilter<$PrismaModel>
    _max?: NestedEnumFoodScanResultFilter<$PrismaModel>
  }

  export type NestedEnumReportStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[]
    notIn?: $Enums.ReportStatus[]
    not?: NestedEnumReportStatusFilter<$PrismaModel> | $Enums.ReportStatus
  }

  export type NestedEnumReportStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReportStatus | EnumReportStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReportStatus[]
    notIn?: $Enums.ReportStatus[]
    not?: NestedEnumReportStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReportStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReportStatusFilter<$PrismaModel>
    _max?: NestedEnumReportStatusFilter<$PrismaModel>
  }

  export type DoctorProfileCreateWithoutUserInput = {
    id?: string
    specialty: string
    licenseNumber: string
    clinicAddress: string
    bio?: string | null
    consultationFee?: number | null
    gender?: string | null
    yearsOfExperience?: number | null
    spokenLanguages?: string | null
    city?: string | null
    country?: string | null
    consultationMode?: string | null
    linkedin?: string | null
    whatsapp?: string | null
    telegram?: string | null
    googleMapsLink?: string | null
    subscriptionStatus?: $Enums.SubscriptionStatus
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    availability?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorProfileUncheckedCreateWithoutUserInput = {
    id?: string
    specialty: string
    licenseNumber: string
    clinicAddress: string
    bio?: string | null
    consultationFee?: number | null
    gender?: string | null
    yearsOfExperience?: number | null
    spokenLanguages?: string | null
    city?: string | null
    country?: string | null
    consultationMode?: string | null
    linkedin?: string | null
    whatsapp?: string | null
    telegram?: string | null
    googleMapsLink?: string | null
    subscriptionStatus?: $Enums.SubscriptionStatus
    subscriptionStart?: Date | string | null
    subscriptionEnd?: Date | string | null
    availability?: string | null
    latitude?: number | null
    longitude?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorProfileCreateOrConnectWithoutUserInput = {
    where: DoctorProfileWhereUniqueInput
    create: XOR<DoctorProfileCreateWithoutUserInput, DoctorProfileUncheckedCreateWithoutUserInput>
  }

  export type HealthProfileCreateWithoutUserInput = {
    id?: string
    birthDate?: Date | string | null
    gender?: string | null
    height?: number | null
    weight?: number | null
    bloodType?: string | null
    diet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthProfileUncheckedCreateWithoutUserInput = {
    id?: string
    birthDate?: Date | string | null
    gender?: string | null
    height?: number | null
    weight?: number | null
    bloodType?: string | null
    diet?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type HealthProfileCreateOrConnectWithoutUserInput = {
    where: HealthProfileWhereUniqueInput
    create: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
  }

  export type MessageCreateWithoutSenderInput = {
    id?: string
    content: string
    read?: boolean
    createdAt?: Date | string
    receiver: UserCreateNestedOneWithoutReceivedMessagesInput
  }

  export type MessageUncheckedCreateWithoutSenderInput = {
    id?: string
    receiverId: string
    content: string
    read?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutSenderInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageCreateManySenderInputEnvelope = {
    data: MessageCreateManySenderInput | MessageCreateManySenderInput[]
  }

  export type MessageCreateWithoutReceiverInput = {
    id?: string
    content: string
    read?: boolean
    createdAt?: Date | string
    sender: UserCreateNestedOneWithoutSentMessagesInput
  }

  export type MessageUncheckedCreateWithoutReceiverInput = {
    id?: string
    senderId: string
    content: string
    read?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageCreateManyReceiverInputEnvelope = {
    data: MessageCreateManyReceiverInput | MessageCreateManyReceiverInput[]
  }

  export type FoodScanCreateWithoutUserInput = {
    id?: string
    productName: string
    barcode?: string | null
    brand?: string | null
    imageUrl?: string | null
    ingredients: string
    result: $Enums.FoodScanResult
    dangerousIngredients?: string | null
    recommendation: string
    nutriscore?: string | null
    createdAt?: Date | string
  }

  export type FoodScanUncheckedCreateWithoutUserInput = {
    id?: string
    productName: string
    barcode?: string | null
    brand?: string | null
    imageUrl?: string | null
    ingredients: string
    result: $Enums.FoodScanResult
    dangerousIngredients?: string | null
    recommendation: string
    nutriscore?: string | null
    createdAt?: Date | string
  }

  export type FoodScanCreateOrConnectWithoutUserInput = {
    where: FoodScanWhereUniqueInput
    create: XOR<FoodScanCreateWithoutUserInput, FoodScanUncheckedCreateWithoutUserInput>
  }

  export type FoodScanCreateManyUserInputEnvelope = {
    data: FoodScanCreateManyUserInput | FoodScanCreateManyUserInput[]
  }

  export type ReportCreateWithoutUserInput = {
    id?: string
    type?: string
    subject: string
    message: string
    productName?: string | null
    barcode?: string | null
    imageUrl?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportUncheckedCreateWithoutUserInput = {
    id?: string
    type?: string
    subject: string
    message: string
    productName?: string | null
    barcode?: string | null
    imageUrl?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ReportCreateOrConnectWithoutUserInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportCreateManyUserInputEnvelope = {
    data: ReportCreateManyUserInput | ReportCreateManyUserInput[]
  }

  export type AppointmentCreateWithoutDoctorInput = {
    id?: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentCreateManyDoctorInputEnvelope = {
    data: AppointmentCreateManyDoctorInput | AppointmentCreateManyDoctorInput[]
  }

  export type AppointmentCreateWithoutPatientInput = {
    id?: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: UserCreateNestedOneWithoutDoctorAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutPatientInput = {
    id?: string
    doctorId: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentCreateManyPatientInputEnvelope = {
    data: AppointmentCreateManyPatientInput | AppointmentCreateManyPatientInput[]
  }

  export type DoctorPatientCreateWithoutDoctorInput = {
    id?: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: UserCreateNestedOneWithoutPatientDoctorsInput
  }

  export type DoctorPatientUncheckedCreateWithoutDoctorInput = {
    id?: string
    patientId: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorPatientCreateOrConnectWithoutDoctorInput = {
    where: DoctorPatientWhereUniqueInput
    create: XOR<DoctorPatientCreateWithoutDoctorInput, DoctorPatientUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorPatientCreateManyDoctorInputEnvelope = {
    data: DoctorPatientCreateManyDoctorInput | DoctorPatientCreateManyDoctorInput[]
  }

  export type DoctorPatientCreateWithoutPatientInput = {
    id?: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctor: UserCreateNestedOneWithoutDoctorPatientsInput
  }

  export type DoctorPatientUncheckedCreateWithoutPatientInput = {
    id?: string
    doctorId: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorPatientCreateOrConnectWithoutPatientInput = {
    where: DoctorPatientWhereUniqueInput
    create: XOR<DoctorPatientCreateWithoutPatientInput, DoctorPatientUncheckedCreateWithoutPatientInput>
  }

  export type DoctorPatientCreateManyPatientInputEnvelope = {
    data: DoctorPatientCreateManyPatientInput | DoctorPatientCreateManyPatientInput[]
  }

  export type NotificationCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: string
    link?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    message: string
    type: string
    link?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type NotificationCreateOrConnectWithoutUserInput = {
    where: NotificationWhereUniqueInput
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationCreateManyUserInputEnvelope = {
    data: NotificationCreateManyUserInput | NotificationCreateManyUserInput[]
  }

  export type DoctorProfileUpsertWithoutUserInput = {
    update: XOR<DoctorProfileUpdateWithoutUserInput, DoctorProfileUncheckedUpdateWithoutUserInput>
    create: XOR<DoctorProfileCreateWithoutUserInput, DoctorProfileUncheckedCreateWithoutUserInput>
    where?: DoctorProfileWhereInput
  }

  export type DoctorProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: DoctorProfileWhereInput
    data: XOR<DoctorProfileUpdateWithoutUserInput, DoctorProfileUncheckedUpdateWithoutUserInput>
  }

  export type DoctorProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    clinicAddress?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    spokenLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    consultationMode?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    googleMapsLink?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: StringFieldUpdateOperationsInput | string
    licenseNumber?: StringFieldUpdateOperationsInput | string
    clinicAddress?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    consultationFee?: NullableFloatFieldUpdateOperationsInput | number | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    yearsOfExperience?: NullableIntFieldUpdateOperationsInput | number | null
    spokenLanguages?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    consultationMode?: NullableStringFieldUpdateOperationsInput | string | null
    linkedin?: NullableStringFieldUpdateOperationsInput | string | null
    whatsapp?: NullableStringFieldUpdateOperationsInput | string | null
    telegram?: NullableStringFieldUpdateOperationsInput | string | null
    googleMapsLink?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionStatus?: EnumSubscriptionStatusFieldUpdateOperationsInput | $Enums.SubscriptionStatus
    subscriptionStart?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    subscriptionEnd?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    availability?: NullableStringFieldUpdateOperationsInput | string | null
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthProfileUpsertWithoutUserInput = {
    update: XOR<HealthProfileUpdateWithoutUserInput, HealthProfileUncheckedUpdateWithoutUserInput>
    create: XOR<HealthProfileCreateWithoutUserInput, HealthProfileUncheckedCreateWithoutUserInput>
    where?: HealthProfileWhereInput
  }

  export type HealthProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: HealthProfileWhereInput
    data: XOR<HealthProfileUpdateWithoutUserInput, HealthProfileUncheckedUpdateWithoutUserInput>
  }

  export type HealthProfileUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    diet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HealthProfileUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    birthDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    height?: NullableFloatFieldUpdateOperationsInput | number | null
    weight?: NullableFloatFieldUpdateOperationsInput | number | null
    bloodType?: NullableStringFieldUpdateOperationsInput | string | null
    diet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
    create: XOR<MessageCreateWithoutSenderInput, MessageUncheckedCreateWithoutSenderInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutSenderInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutSenderInput, MessageUncheckedUpdateWithoutSenderInput>
  }

  export type MessageUpdateManyWithWhereWithoutSenderInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutSenderInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    senderId?: StringFilter<"Message"> | string
    receiverId?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    read?: BoolFilter<"Message"> | boolean
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
    create: XOR<MessageCreateWithoutReceiverInput, MessageUncheckedCreateWithoutReceiverInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutReceiverInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutReceiverInput, MessageUncheckedUpdateWithoutReceiverInput>
  }

  export type MessageUpdateManyWithWhereWithoutReceiverInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutReceiverInput>
  }

  export type FoodScanUpsertWithWhereUniqueWithoutUserInput = {
    where: FoodScanWhereUniqueInput
    update: XOR<FoodScanUpdateWithoutUserInput, FoodScanUncheckedUpdateWithoutUserInput>
    create: XOR<FoodScanCreateWithoutUserInput, FoodScanUncheckedCreateWithoutUserInput>
  }

  export type FoodScanUpdateWithWhereUniqueWithoutUserInput = {
    where: FoodScanWhereUniqueInput
    data: XOR<FoodScanUpdateWithoutUserInput, FoodScanUncheckedUpdateWithoutUserInput>
  }

  export type FoodScanUpdateManyWithWhereWithoutUserInput = {
    where: FoodScanScalarWhereInput
    data: XOR<FoodScanUpdateManyMutationInput, FoodScanUncheckedUpdateManyWithoutUserInput>
  }

  export type FoodScanScalarWhereInput = {
    AND?: FoodScanScalarWhereInput | FoodScanScalarWhereInput[]
    OR?: FoodScanScalarWhereInput[]
    NOT?: FoodScanScalarWhereInput | FoodScanScalarWhereInput[]
    id?: StringFilter<"FoodScan"> | string
    userId?: StringFilter<"FoodScan"> | string
    productName?: StringFilter<"FoodScan"> | string
    barcode?: StringNullableFilter<"FoodScan"> | string | null
    brand?: StringNullableFilter<"FoodScan"> | string | null
    imageUrl?: StringNullableFilter<"FoodScan"> | string | null
    ingredients?: StringFilter<"FoodScan"> | string
    result?: EnumFoodScanResultFilter<"FoodScan"> | $Enums.FoodScanResult
    dangerousIngredients?: StringNullableFilter<"FoodScan"> | string | null
    recommendation?: StringFilter<"FoodScan"> | string
    nutriscore?: StringNullableFilter<"FoodScan"> | string | null
    createdAt?: DateTimeFilter<"FoodScan"> | Date | string
  }

  export type ReportUpsertWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
  }

  export type ReportUpdateManyWithWhereWithoutUserInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutUserInput>
  }

  export type ReportScalarWhereInput = {
    AND?: ReportScalarWhereInput | ReportScalarWhereInput[]
    OR?: ReportScalarWhereInput[]
    NOT?: ReportScalarWhereInput | ReportScalarWhereInput[]
    id?: StringFilter<"Report"> | string
    userId?: StringFilter<"Report"> | string
    type?: StringFilter<"Report"> | string
    subject?: StringFilter<"Report"> | string
    message?: StringFilter<"Report"> | string
    productName?: StringNullableFilter<"Report"> | string | null
    barcode?: StringNullableFilter<"Report"> | string | null
    imageUrl?: StringNullableFilter<"Report"> | string | null
    status?: EnumReportStatusFilter<"Report"> | $Enums.ReportStatus
    createdAt?: DateTimeFilter<"Report"> | Date | string
    updatedAt?: DateTimeFilter<"Report"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
    create: XOR<AppointmentCreateWithoutDoctorInput, AppointmentUncheckedCreateWithoutDoctorInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutDoctorInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutDoctorInput, AppointmentUncheckedUpdateWithoutDoctorInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutDoctorInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutDoctorInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    doctorId?: StringFilter<"Appointment"> | string
    patientId?: StringFilter<"Appointment"> | string
    date?: DateTimeFilter<"Appointment"> | Date | string
    duration?: IntFilter<"Appointment"> | number
    type?: StringFilter<"Appointment"> | string
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    updatedAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type AppointmentUpsertWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
    create: XOR<AppointmentCreateWithoutPatientInput, AppointmentUncheckedCreateWithoutPatientInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutPatientInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutPatientInput, AppointmentUncheckedUpdateWithoutPatientInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutPatientInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutPatientInput>
  }

  export type DoctorPatientUpsertWithWhereUniqueWithoutDoctorInput = {
    where: DoctorPatientWhereUniqueInput
    update: XOR<DoctorPatientUpdateWithoutDoctorInput, DoctorPatientUncheckedUpdateWithoutDoctorInput>
    create: XOR<DoctorPatientCreateWithoutDoctorInput, DoctorPatientUncheckedCreateWithoutDoctorInput>
  }

  export type DoctorPatientUpdateWithWhereUniqueWithoutDoctorInput = {
    where: DoctorPatientWhereUniqueInput
    data: XOR<DoctorPatientUpdateWithoutDoctorInput, DoctorPatientUncheckedUpdateWithoutDoctorInput>
  }

  export type DoctorPatientUpdateManyWithWhereWithoutDoctorInput = {
    where: DoctorPatientScalarWhereInput
    data: XOR<DoctorPatientUpdateManyMutationInput, DoctorPatientUncheckedUpdateManyWithoutDoctorInput>
  }

  export type DoctorPatientScalarWhereInput = {
    AND?: DoctorPatientScalarWhereInput | DoctorPatientScalarWhereInput[]
    OR?: DoctorPatientScalarWhereInput[]
    NOT?: DoctorPatientScalarWhereInput | DoctorPatientScalarWhereInput[]
    id?: StringFilter<"DoctorPatient"> | string
    doctorId?: StringFilter<"DoctorPatient"> | string
    patientId?: StringFilter<"DoctorPatient"> | string
    status?: StringFilter<"DoctorPatient"> | string
    notes?: StringNullableFilter<"DoctorPatient"> | string | null
    diseases?: StringNullableFilter<"DoctorPatient"> | string | null
    allergies?: StringNullableFilter<"DoctorPatient"> | string | null
    medications?: StringNullableFilter<"DoctorPatient"> | string | null
    medicalHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    familyHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    surgeryHistory?: StringNullableFilter<"DoctorPatient"> | string | null
    bloodPressure?: StringNullableFilter<"DoctorPatient"> | string | null
    heartRate?: IntNullableFilter<"DoctorPatient"> | number | null
    temperature?: FloatNullableFilter<"DoctorPatient"> | number | null
    symptoms?: StringNullableFilter<"DoctorPatient"> | string | null
    diagnosis?: StringNullableFilter<"DoctorPatient"> | string | null
    treatmentPlan?: StringNullableFilter<"DoctorPatient"> | string | null
    examsRequested?: StringNullableFilter<"DoctorPatient"> | string | null
    observation?: StringNullableFilter<"DoctorPatient"> | string | null
    recommendations?: StringNullableFilter<"DoctorPatient"> | string | null
    documents?: StringNullableFilter<"DoctorPatient"> | string | null
    nextConsultation?: DateTimeNullableFilter<"DoctorPatient"> | Date | string | null
    consultationReason?: StringNullableFilter<"DoctorPatient"> | string | null
    createdAt?: DateTimeFilter<"DoctorPatient"> | Date | string
    updatedAt?: DateTimeFilter<"DoctorPatient"> | Date | string
  }

  export type DoctorPatientUpsertWithWhereUniqueWithoutPatientInput = {
    where: DoctorPatientWhereUniqueInput
    update: XOR<DoctorPatientUpdateWithoutPatientInput, DoctorPatientUncheckedUpdateWithoutPatientInput>
    create: XOR<DoctorPatientCreateWithoutPatientInput, DoctorPatientUncheckedCreateWithoutPatientInput>
  }

  export type DoctorPatientUpdateWithWhereUniqueWithoutPatientInput = {
    where: DoctorPatientWhereUniqueInput
    data: XOR<DoctorPatientUpdateWithoutPatientInput, DoctorPatientUncheckedUpdateWithoutPatientInput>
  }

  export type DoctorPatientUpdateManyWithWhereWithoutPatientInput = {
    where: DoctorPatientScalarWhereInput
    data: XOR<DoctorPatientUpdateManyMutationInput, DoctorPatientUncheckedUpdateManyWithoutPatientInput>
  }

  export type NotificationUpsertWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    update: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
    create: XOR<NotificationCreateWithoutUserInput, NotificationUncheckedCreateWithoutUserInput>
  }

  export type NotificationUpdateWithWhereUniqueWithoutUserInput = {
    where: NotificationWhereUniqueInput
    data: XOR<NotificationUpdateWithoutUserInput, NotificationUncheckedUpdateWithoutUserInput>
  }

  export type NotificationUpdateManyWithWhereWithoutUserInput = {
    where: NotificationScalarWhereInput
    data: XOR<NotificationUpdateManyMutationInput, NotificationUncheckedUpdateManyWithoutUserInput>
  }

  export type NotificationScalarWhereInput = {
    AND?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    OR?: NotificationScalarWhereInput[]
    NOT?: NotificationScalarWhereInput | NotificationScalarWhereInput[]
    id?: StringFilter<"Notification"> | string
    userId?: StringFilter<"Notification"> | string
    title?: StringFilter<"Notification"> | string
    message?: StringFilter<"Notification"> | string
    type?: StringFilter<"Notification"> | string
    link?: StringNullableFilter<"Notification"> | string | null
    read?: BoolFilter<"Notification"> | boolean
    createdAt?: DateTimeFilter<"Notification"> | Date | string
  }

  export type UserCreateWithoutDoctorProfileInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoctorProfileInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoctorProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorProfileInput, UserUncheckedCreateWithoutDoctorProfileInput>
  }

  export type UserUpsertWithoutDoctorProfileInput = {
    update: XOR<UserUpdateWithoutDoctorProfileInput, UserUncheckedUpdateWithoutDoctorProfileInput>
    create: XOR<UserCreateWithoutDoctorProfileInput, UserUncheckedCreateWithoutDoctorProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorProfileInput, UserUncheckedUpdateWithoutDoctorProfileInput>
  }

  export type UserUpdateWithoutDoctorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutHealthProfileInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutHealthProfileInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutHealthProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutHealthProfileInput, UserUncheckedCreateWithoutHealthProfileInput>
  }

  export type UserUpsertWithoutHealthProfileInput = {
    update: XOR<UserUpdateWithoutHealthProfileInput, UserUncheckedUpdateWithoutHealthProfileInput>
    create: XOR<UserCreateWithoutHealthProfileInput, UserUncheckedCreateWithoutHealthProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutHealthProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutHealthProfileInput, UserUncheckedUpdateWithoutHealthProfileInput>
  }

  export type UserUpdateWithoutHealthProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutHealthProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDoctorPatientsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoctorPatientsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoctorPatientsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorPatientsInput, UserUncheckedCreateWithoutDoctorPatientsInput>
  }

  export type UserCreateWithoutPatientDoctorsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPatientDoctorsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPatientDoctorsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientDoctorsInput, UserUncheckedCreateWithoutPatientDoctorsInput>
  }

  export type UserUpsertWithoutDoctorPatientsInput = {
    update: XOR<UserUpdateWithoutDoctorPatientsInput, UserUncheckedUpdateWithoutDoctorPatientsInput>
    create: XOR<UserCreateWithoutDoctorPatientsInput, UserUncheckedCreateWithoutDoctorPatientsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorPatientsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorPatientsInput, UserUncheckedUpdateWithoutDoctorPatientsInput>
  }

  export type UserUpdateWithoutDoctorPatientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorPatientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutPatientDoctorsInput = {
    update: XOR<UserUpdateWithoutPatientDoctorsInput, UserUncheckedUpdateWithoutPatientDoctorsInput>
    create: XOR<UserCreateWithoutPatientDoctorsInput, UserUncheckedCreateWithoutPatientDoctorsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientDoctorsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientDoctorsInput, UserUncheckedUpdateWithoutPatientDoctorsInput>
  }

  export type UserUpdateWithoutPatientDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientDoctorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutDoctorAppointmentsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDoctorAppointmentsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDoctorAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
  }

  export type UserCreateWithoutPatientAppointmentsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPatientAppointmentsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPatientAppointmentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPatientAppointmentsInput, UserUncheckedCreateWithoutPatientAppointmentsInput>
  }

  export type UserUpsertWithoutDoctorAppointmentsInput = {
    update: XOR<UserUpdateWithoutDoctorAppointmentsInput, UserUncheckedUpdateWithoutDoctorAppointmentsInput>
    create: XOR<UserCreateWithoutDoctorAppointmentsInput, UserUncheckedCreateWithoutDoctorAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDoctorAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDoctorAppointmentsInput, UserUncheckedUpdateWithoutDoctorAppointmentsInput>
  }

  export type UserUpdateWithoutDoctorAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDoctorAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutPatientAppointmentsInput = {
    update: XOR<UserUpdateWithoutPatientAppointmentsInput, UserUncheckedUpdateWithoutPatientAppointmentsInput>
    create: XOR<UserCreateWithoutPatientAppointmentsInput, UserUncheckedCreateWithoutPatientAppointmentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPatientAppointmentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPatientAppointmentsInput, UserUncheckedUpdateWithoutPatientAppointmentsInput>
  }

  export type UserUpdateWithoutPatientAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPatientAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentMessagesInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
  }

  export type UserCreateWithoutReceivedMessagesInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceivedMessagesInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceivedMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
  }

  export type UserUpsertWithoutSentMessagesInput = {
    update: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
    create: XOR<UserCreateWithoutSentMessagesInput, UserUncheckedCreateWithoutSentMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentMessagesInput, UserUncheckedUpdateWithoutSentMessagesInput>
  }

  export type UserUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReceivedMessagesInput = {
    update: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
    create: XOR<UserCreateWithoutReceivedMessagesInput, UserUncheckedCreateWithoutReceivedMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedMessagesInput, UserUncheckedUpdateWithoutReceivedMessagesInput>
  }

  export type UserUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFoodScansInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFoodScansInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFoodScansInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFoodScansInput, UserUncheckedCreateWithoutFoodScansInput>
  }

  export type UserUpsertWithoutFoodScansInput = {
    update: XOR<UserUpdateWithoutFoodScansInput, UserUncheckedUpdateWithoutFoodScansInput>
    create: XOR<UserCreateWithoutFoodScansInput, UserUncheckedCreateWithoutFoodScansInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFoodScansInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFoodScansInput, UserUncheckedUpdateWithoutFoodScansInput>
  }

  export type UserUpdateWithoutFoodScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFoodScansInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutReportsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
    notifications?: NotificationCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
    notifications?: NotificationUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReportsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
  }

  export type UserUpsertWithoutReportsInput = {
    update: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
    create: XOR<UserCreateWithoutReportsInput, UserUncheckedCreateWithoutReportsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReportsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReportsInput, UserUncheckedUpdateWithoutReportsInput>
  }

  export type UserUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
    notifications?: NotificationUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileCreateNestedOneWithoutUserInput
    sentMessages?: MessageCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanCreateNestedManyWithoutUserInput
    reports?: ReportCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientCreateNestedManyWithoutPatientInput
  }

  export type UserUncheckedCreateWithoutNotificationsInput = {
    id?: string
    email: string
    password: string
    role: $Enums.UserRole
    firstName: string
    lastName: string
    phone?: string | null
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    doctorProfile?: DoctorProfileUncheckedCreateNestedOneWithoutUserInput
    healthProfile?: HealthProfileUncheckedCreateNestedOneWithoutUserInput
    sentMessages?: MessageUncheckedCreateNestedManyWithoutSenderInput
    receivedMessages?: MessageUncheckedCreateNestedManyWithoutReceiverInput
    foodScans?: FoodScanUncheckedCreateNestedManyWithoutUserInput
    reports?: ReportUncheckedCreateNestedManyWithoutUserInput
    doctorAppointments?: AppointmentUncheckedCreateNestedManyWithoutDoctorInput
    patientAppointments?: AppointmentUncheckedCreateNestedManyWithoutPatientInput
    doctorPatients?: DoctorPatientUncheckedCreateNestedManyWithoutDoctorInput
    patientDoctors?: DoctorPatientUncheckedCreateNestedManyWithoutPatientInput
  }

  export type UserCreateOrConnectWithoutNotificationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
  }

  export type UserUpsertWithoutNotificationsInput = {
    update: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
    create: XOR<UserCreateWithoutNotificationsInput, UserUncheckedCreateWithoutNotificationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNotificationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNotificationsInput, UserUncheckedUpdateWithoutNotificationsInput>
  }

  export type UserUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUpdateManyWithoutUserNestedInput
    reports?: ReportUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUpdateManyWithoutPatientNestedInput
  }

  export type UserUncheckedUpdateWithoutNotificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctorProfile?: DoctorProfileUncheckedUpdateOneWithoutUserNestedInput
    healthProfile?: HealthProfileUncheckedUpdateOneWithoutUserNestedInput
    sentMessages?: MessageUncheckedUpdateManyWithoutSenderNestedInput
    receivedMessages?: MessageUncheckedUpdateManyWithoutReceiverNestedInput
    foodScans?: FoodScanUncheckedUpdateManyWithoutUserNestedInput
    reports?: ReportUncheckedUpdateManyWithoutUserNestedInput
    doctorAppointments?: AppointmentUncheckedUpdateManyWithoutDoctorNestedInput
    patientAppointments?: AppointmentUncheckedUpdateManyWithoutPatientNestedInput
    doctorPatients?: DoctorPatientUncheckedUpdateManyWithoutDoctorNestedInput
    patientDoctors?: DoctorPatientUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type MessageCreateManySenderInput = {
    id?: string
    receiverId: string
    content: string
    read?: boolean
    createdAt?: Date | string
  }

  export type MessageCreateManyReceiverInput = {
    id?: string
    senderId: string
    content: string
    read?: boolean
    createdAt?: Date | string
  }

  export type FoodScanCreateManyUserInput = {
    id?: string
    productName: string
    barcode?: string | null
    brand?: string | null
    imageUrl?: string | null
    ingredients: string
    result: $Enums.FoodScanResult
    dangerousIngredients?: string | null
    recommendation: string
    nutriscore?: string | null
    createdAt?: Date | string
  }

  export type ReportCreateManyUserInput = {
    id?: string
    type?: string
    subject: string
    message: string
    productName?: string | null
    barcode?: string | null
    imageUrl?: string | null
    status?: $Enums.ReportStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyDoctorInput = {
    id?: string
    patientId: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AppointmentCreateManyPatientInput = {
    id?: string
    doctorId: string
    date: Date | string
    duration?: number
    type?: string
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorPatientCreateManyDoctorInput = {
    id?: string
    patientId: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DoctorPatientCreateManyPatientInput = {
    id?: string
    doctorId: string
    status?: string
    notes?: string | null
    diseases?: string | null
    allergies?: string | null
    medications?: string | null
    medicalHistory?: string | null
    familyHistory?: string | null
    surgeryHistory?: string | null
    bloodPressure?: string | null
    heartRate?: number | null
    temperature?: number | null
    symptoms?: string | null
    diagnosis?: string | null
    treatmentPlan?: string | null
    examsRequested?: string | null
    observation?: string | null
    recommendations?: string | null
    documents?: string | null
    nextConsultation?: Date | string | null
    consultationReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NotificationCreateManyUserInput = {
    id?: string
    title: string
    message: string
    type: string
    link?: string | null
    read?: boolean
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    receiver?: UserUpdateOneRequiredWithoutReceivedMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutSenderInput = {
    id?: StringFieldUpdateOperationsInput | string
    receiverId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sender?: UserUpdateOneRequiredWithoutSentMessagesNestedInput
  }

  export type MessageUncheckedUpdateWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutReceiverInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodScanUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: StringFieldUpdateOperationsInput | string
    result?: EnumFoodScanResultFieldUpdateOperationsInput | $Enums.FoodScanResult
    dangerousIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: StringFieldUpdateOperationsInput | string
    nutriscore?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodScanUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: StringFieldUpdateOperationsInput | string
    result?: EnumFoodScanResultFieldUpdateOperationsInput | $Enums.FoodScanResult
    dangerousIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: StringFieldUpdateOperationsInput | string
    nutriscore?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FoodScanUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    productName?: StringFieldUpdateOperationsInput | string
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    brand?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    ingredients?: StringFieldUpdateOperationsInput | string
    result?: EnumFoodScanResultFieldUpdateOperationsInput | $Enums.FoodScanResult
    dangerousIngredients?: NullableStringFieldUpdateOperationsInput | string | null
    recommendation?: StringFieldUpdateOperationsInput | string
    nutriscore?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    productName?: NullableStringFieldUpdateOperationsInput | string | null
    barcode?: NullableStringFieldUpdateOperationsInput | string | null
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: UserUpdateOneRequiredWithoutDoctorAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    duration?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorPatientUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: UserUpdateOneRequiredWithoutPatientDoctorsNestedInput
  }

  export type DoctorPatientUncheckedUpdateWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorPatientUncheckedUpdateManyWithoutDoctorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorPatientUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    doctor?: UserUpdateOneRequiredWithoutDoctorPatientsNestedInput
  }

  export type DoctorPatientUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DoctorPatientUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    doctorId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    diseases?: NullableStringFieldUpdateOperationsInput | string | null
    allergies?: NullableStringFieldUpdateOperationsInput | string | null
    medications?: NullableStringFieldUpdateOperationsInput | string | null
    medicalHistory?: NullableStringFieldUpdateOperationsInput | string | null
    familyHistory?: NullableStringFieldUpdateOperationsInput | string | null
    surgeryHistory?: NullableStringFieldUpdateOperationsInput | string | null
    bloodPressure?: NullableStringFieldUpdateOperationsInput | string | null
    heartRate?: NullableIntFieldUpdateOperationsInput | number | null
    temperature?: NullableFloatFieldUpdateOperationsInput | number | null
    symptoms?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatmentPlan?: NullableStringFieldUpdateOperationsInput | string | null
    examsRequested?: NullableStringFieldUpdateOperationsInput | string | null
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    recommendations?: NullableStringFieldUpdateOperationsInput | string | null
    documents?: NullableStringFieldUpdateOperationsInput | string | null
    nextConsultation?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    consultationReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NotificationUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    link?: NullableStringFieldUpdateOperationsInput | string | null
    read?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}