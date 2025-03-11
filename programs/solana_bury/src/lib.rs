use anchor_lang::prelude::*;

declare_id!("4cFbgjxb1aWA729GGsdaBdJQwkeE8Ljd3eK3xRSmP7z9");

#[program]
pub mod solana_bury {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn bury(ctx: Context<BuryCtx>, whose_tombstone: String) -> Result<()> {
        // 埋葬指令
        let tombstone_account: &mut Account<Tombstone> = &mut ctx.accounts.tombstone_account;
        tombstone_account.whose_tombstone = whose_tombstone.clone();
        tombstone_account.celebrant = *ctx.accounts.celebrant.key;
        msg!("bury {:?}", whose_tombstone);
        Ok(())
    }

    pub fn worship(ctx: Context<WorshipCtx>,
            whose_tombstone: String,
            blessings_context: String,
            offering_count: u64) -> Result<()> {
        // 祭拜指令
        let blessings_account: &mut Account<Blessings> = &mut ctx.accounts.blessings_account;
        blessings_account.whose_tombstone = whose_tombstone.clone();
        blessings_account.worshipper = *ctx.accounts.worshipper.key;
        blessings_account.blessings_context = blessings_context.clone();
        blessings_account.offering_count = offering_count.clone();
        msg!("worship {:?} blessings {:?} offering {:?}",
            whose_tombstone, blessings_context, offering_count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
#[instruction(whose_tombstone: String)]
pub struct BuryCtx<'info> {
    //埋葬指令所需的參數account
    #[account(
        init_if_needed,
        seeds = [
            "solana_bury_tombstone".as_bytes(),
            whose_tombstone.as_bytes(),
            celebrant.key().as_ref()
        ],
        bump,
        payer = celebrant,
        space = 8 + Tombstone::INIT_SPACE
    )]
    pub tombstone_account: Account<'info, Tombstone>,
    #[account(mut)]
    pub celebrant: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(
    whose_tombstone: String,
    blessings_context: String,
    offering_count: u64)]
pub struct WorshipCtx<'info> {
    //祭拜指令所需的參數account
    #[account(
        init_if_needed,
        seeds = [
            "solana_bury_blessings".as_bytes(),
            whose_tombstone.as_bytes(),
            worshipper.key().as_ref()
        ],
        bump,
        payer = worshipper,
        space = 8 + Blessings::INIT_SPACE
    )]
    pub blessings_account: Account<'info, Blessings>,
    #[account(mut)]
    pub worshipper: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Tombstone {
    //墓碑區塊
    #[max_len(32)]
    pub whose_tombstone: String,
    pub celebrant: Pubkey
}

#[account]
#[derive(InitSpace)]
pub struct Blessings {
    //祭拜祝詞區塊
    #[max_len(32)]
    pub whose_tombstone: String,
    pub worshipper: Pubkey,
    #[max_len(32)]
    pub blessings_context: String,
    pub offering_count: u64
}