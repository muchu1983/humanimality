use anchor_lang::prelude::*;

declare_id!("4LxT6fYaWmQQyHf7XPcSZnX9AqQpx7Cg6wfjHPDnF8ds");

#[program]
pub mod solana_bury {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
